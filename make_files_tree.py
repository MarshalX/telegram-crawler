import asyncio
import hashlib
import json
import logging
import mimetypes
import os
import platform
import random
import re
import shutil
import socket
import uuid
import zipfile
from asyncio.exceptions import TimeoutError
from string import punctuation, whitespace
from time import time
from typing import List, Optional
from xml.etree import ElementTree

import aiofiles
import aiohttp
import uvloop
from aiohttp import ClientConnectorError, ServerDisconnectedError

import ccl_bplist

PROTOCOL = 'https://'
ILLEGAL_PATH_CHARS = punctuation.replace('.', '') + whitespace

CRAWL_STATUS_CODE_EXCLUSIONS = {
    'webappinternal.telegram.org/botfather',
    'webappinternal.telegram.org/stickers',
}

DYNAMIC_PART_MOCK = 'telegram-crawler'

INPUT_FILENAME = os.environ.get('INPUT_FILENAME', 'tracked_links.txt')
INPUT_RES_FILENAME = os.environ.get('INPUT_FILENAME', 'tracked_res_links.txt')
INPUT_TR_FILENAME = os.environ.get('INPUT_FILENAME', 'tracked_tr_links.txt')
OUTPUT_FOLDER = os.environ.get('OUTPUT_FOLDER', 'data/')
OUTPUT_MTPROTO_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_MTPROTO_FOLDER', 'server/'))
OUTPUT_SITES_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_SITES_FOLDER', 'web/'))
OUTPUT_CLIENTS_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_CLIENTS_FOLDER', 'client/'))
OUTPUT_RESOURCES_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_RESOURCES_FOLDER', 'web_res/'))
OUTPUT_TRANSLATIONS_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_RESOURCES_FOLDER', 'web_tr/'))
OUTPUT_MINI_APPS_FOLDER = os.path.join(OUTPUT_FOLDER, os.environ.get('OUTPUT_MINI_APPS_FOLDER', 'mini_app/'))

TRANSLATIONS_EN_CATEGORY_URL_REGEX = r'/en/[a-z_]+/[a-z_]+$'

PAGE_GENERATION_TIME_REGEX = r'<!-- page generated in .+ -->'
PAGE_API_HASH_REGEX = r'\?hash=[a-z0-9]+'
PAGE_API_HASH_TEMPLATE = f'?hash={DYNAMIC_PART_MOCK}'
TON_RATE_REGEX = r'"tonRate":"[.0-9]+"'
TON_RATE_TEMPLATE = f'"tonRate":"{DYNAMIC_PART_MOCK}"'
APK_BETA_TOKEN_REGEX = r'apk\?token=.*?"'
APK_BETA_TOKEN_TEMPLATE = f'apk?token={DYNAMIC_PART_MOCK}"'
PASSPORT_SSID_REGEX = r'passport_ssid=[a-z0-9]+_[a-z0-9]+_[a-z0-9]+'
PASSPORT_SSID_TEMPLATE = f'passport_ssid={DYNAMIC_PART_MOCK}'
NONCE_REGEX = r'"nonce":"[a-z0-9]+_[a-z0-9]+_[a-z0-9]+'
NONCE_TEMPLATE = f'"nonce":"{DYNAMIC_PART_MOCK}'
PROXY_CONFIG_SUB_NET_REGEX = r'\d+\.\d+:8888;'
PROXY_CONFIG_SUB_NET_TEMPLATE = 'X.X:8888;'
TRANSLATE_SUGGESTION_REGEX = r'<div class="tr-value-suggestion">(.?)+</div>'
SPARKLE_SIG_REGEX = r';sig=(.*?);'
SPARKLE_SE_REGEX = r';se=(.*?);'
SPARKLE_SIG_TEMPLATE = f';sig={DYNAMIC_PART_MOCK};'
SPARKLE_SE_TEMPLATE = f';se={DYNAMIC_PART_MOCK};'

STEL_DEV_LAYER = 190

TIMEOUT = aiohttp.ClientTimeout(  # mediumly sized from link collector
    total=60,
    connect=60,
    sock_connect=30,
    sock_read=60,
)
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Cookie': f'stel_ln=en; stel_dev_layer={STEL_DEV_LAYER}',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
    'TE': 'trailers',
}

logging.basicConfig(format='%(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)


def get_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


async def download_file(url: str, path: str, session: aiohttp.ClientSession):
    params = {'tgcrawlNoCache': uuid.uuid4().hex}
    async with session.get(url, params=params) as response:
        if response.status != 200:
            return

        content = await response.read()

    async with aiofiles.open(path, mode='wb') as f:
        await f.write(content)


async def track_additional_files(
        files_to_track: List[str], input_dir_name: str, output_dir_name: str, encoding='utf-8', save_hash_only=False
):
    kwargs = {'mode': 'r', 'encoding': encoding}
    if save_hash_only:
        kwargs['mode'] = 'rb'
        del kwargs['encoding']

    for file in files_to_track:
        async with aiofiles.open(os.path.join(input_dir_name, file), **kwargs) as r_file:
            content = await r_file.read()

        if save_hash_only:
            content = get_hash(content)
        else:
            content = re.sub(r'id=".*"', 'id="tgcrawl"', content)

        filename = os.path.join(output_dir_name, file)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        async with aiofiles.open(filename, 'w', encoding='utf-8') as w_file:
            await w_file.write(content)


async def get_download_link_of_latest_macos_release(remote_updates_manifest_url: str, session: aiohttp.ClientSession) -> Optional[str]:
    async with session.get(remote_updates_manifest_url) as response:
        if response.status != 200:
            logger.error(f'Error {response.status} while fetching {remote_updates_manifest_url}')
            return None

        try:
            response = await response.text()  # we do expect XML here
        except Exception as e:
            logger.error(f'Error processing response: {e}')
            return None

    if not isinstance(response, str) and not response.lstrip().startswith('<rss'):
        logger.error('Response is not a valid XML string')
        return None

    root = ElementTree.fromstring(response)
    item = root.find('.//item')
    if item is not None:
        enclosure = item.find('enclosure')
        if enclosure is not None:
            return enclosure.get('url')

    return None


async def download_telegram_macos_beta_and_extract_resources(session: aiohttp.ClientSession):
    remote_updates_manifest_url = 'https://mac-updates.telegram.org/beta/versions.xml'
    download_url = await get_download_link_of_latest_macos_release(remote_updates_manifest_url, session)

    if not download_url:
        return

    crawled_data_folder = os.path.join(OUTPUT_CLIENTS_FOLDER, 'macos-beta')
    client_folder_name = 'macos'
    client_archive_name = 'macos.zip'

    assets_output_dir = 'macos_assets'
    assets_filename = 'Assets.car'
    assets_extractor = 'acextract'

    tool_download_url = 'https://github.com/MarshalX/acextract/releases/download/3.0/acextract'

    if 'darwin' not in platform.system().lower():
        await download_file(download_url, client_archive_name, session)
    else:
        await asyncio.gather(
            download_file(download_url, client_archive_name, session),
            download_file(tool_download_url, assets_extractor, session),
        )

    # synced
    with zipfile.ZipFile(client_archive_name, 'r') as f:
        f.extractall(client_folder_name)

    resources_path = 'Telegram.app/Contents/Resources'
    files_to_track = [
        f'{resources_path}/en.lproj/Localizable.strings',
    ]
    await track_additional_files(files_to_track, client_folder_name, crawled_data_folder, 'utf-16')

    _, _, hash_of_files_to_track = next(os.walk(f'{client_folder_name}/{resources_path}'))
    hash_of_files_to_track = [f'{resources_path}/{i}' for i in hash_of_files_to_track if i != assets_filename]
    await track_additional_files(hash_of_files_to_track, client_folder_name, crawled_data_folder, save_hash_only=True)

    def cleanup1():
        os.path.isdir(client_folder_name) and shutil.rmtree(client_folder_name)
        os.remove(client_archive_name)

    # .car crawler works only in macOS
    if 'darwin' not in platform.system().lower():
        cleanup1()
        return

    path_to_car = os.path.join(client_folder_name, resources_path, assets_filename)
    await (await asyncio.create_subprocess_exec('chmod', '+x', assets_extractor)).communicate()
    process = await asyncio.create_subprocess_exec(f'./{assets_extractor}', '-i', path_to_car, '-o', assets_output_dir)
    await process.communicate()

    def cleanup2():
        cleanup1()
        os.path.isdir(assets_output_dir) and shutil.rmtree(assets_output_dir)
        os.remove(assets_extractor)

    if process.returncode != 0:
        cleanup2()
        return

    _, _, hash_of_files_to_track = next(os.walk(assets_output_dir))
    await track_additional_files(
        hash_of_files_to_track,
        assets_output_dir,
        os.path.join(crawled_data_folder, assets_filename),
        save_hash_only=True
    )

    cleanup2()

    return  # the code below returns a random result depending on the system?

    executable_path = os.path.join(client_folder_name, 'Telegram.app/Contents/MacOS/Telegram')
    process = await asyncio.create_subprocess_exec(
        f'strings', '-n', '7', '-arch', 'x86_64', '--', executable_path, stdout=asyncio.subprocess.PIPE
    )

    stdout = b''
    while process.returncode is None:
        stdout_part = await process.stdout.read(1024)
        if not stdout_part:
            break

        stdout += stdout_part

    if process.returncode != 0:
        cleanup2()
        return

    import string
    binary_strings = stdout.decode('utf-8').split('\n')
    special_chars = list(string.punctuation)
    valid_strings = []
    for string in binary_strings:
        if sum([1 for char in string if char in special_chars]) > 5:
            continue

        valid_strings.append(string.strip())

    valid_strings = sorted(list(set(valid_strings)))
    with open(os.path.join(crawled_data_folder, 'strings.txt'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(valid_strings))

    cleanup2()


async def download_telegram_ios_beta_and_extract_resources(session: aiohttp.ClientSession):
    # TODO fetch version automatically
    # ref: https://docs.github.com/en/rest/releases/releases#get-the-latest-release
    version = '9.0.24102'

    download_url = f'https://github.com/MarshalX/decrypted-telegram-ios/releases/download/{version}/Telegram-{version}.ipa'
    tool_download_url = 'https://github.com/MarshalX/acextract/releases/download/3.0/acextract'

    ipa_filename = f'Telegram-{version}.ipa'
    assets_extractor = 'acextract_ios'
    assets_filename = 'Assets.car'
    assets_output_dir = 'ios_assets'
    client_folder_name = 'ios'
    crawled_data_folder = os.path.join(OUTPUT_CLIENTS_FOLDER, 'ios-beta')

    if 'darwin' not in platform.system().lower():
        await download_file(download_url, ipa_filename, session)
    else:
        await asyncio.gather(
            download_file(download_url, ipa_filename, session),
            download_file(tool_download_url, assets_extractor, session),
        )

    # synced
    with zipfile.ZipFile(ipa_filename, 'r') as f:
        f.extractall(client_folder_name)

    resources_path = 'Payload/Telegram.app'

    files_to_convert = [
        f'{resources_path}/en.lproj/Localizable.strings',
        f'{resources_path}/en.lproj/InfoPlist.strings',
        f'{resources_path}/en.lproj/AppIntentVocabulary.plist',
    ]
    for filename in files_to_convert:
        path = os.path.join(client_folder_name, filename)

        # synced cuz ccl_bplist works with file objects and doesn't support asyncio
        with open(path, 'rb') as r_file:
            plist = ccl_bplist.load(r_file)

        async with aiofiles.open(path, 'w', encoding='utf-8') as w_file:
            await w_file.write(json.dumps(plist, indent=4))

    files_to_track = files_to_convert + [
        f'{resources_path}/_CodeSignature/CodeResources',
        f'{resources_path}/SC_Info/Manifest.plist',
    ]
    await track_additional_files(files_to_track, client_folder_name, crawled_data_folder)

    resources_folder = os.path.join(client_folder_name, resources_path)
    crawled_resources_folder = os.path.join(crawled_data_folder, resources_path)
    _, _, hash_of_files_to_track = next(os.walk(resources_folder))
    await track_additional_files(
        hash_of_files_to_track, resources_folder, crawled_resources_folder, save_hash_only=True
    )

    def cleanup1():
        os.path.isdir(client_folder_name) and shutil.rmtree(client_folder_name)
        os.remove(ipa_filename)

    # sry for copy-paste from macos def ;d

    # .car crawler works only in macOS
    if 'darwin' not in platform.system().lower():
        cleanup1()
        return

    path_to_car = os.path.join(resources_folder, assets_filename)
    await (await asyncio.create_subprocess_exec('chmod', '+x', assets_extractor)).communicate()
    process = await asyncio.create_subprocess_exec(f'./{assets_extractor}', '-i', path_to_car, '-o', assets_output_dir)
    await process.communicate()

    def cleanup2():
        cleanup1()
        os.path.isdir(assets_output_dir) and shutil.rmtree(assets_output_dir)
        os.remove(assets_extractor)

    if process.returncode != 0:
        cleanup2()
        return

    for dir_path, _, hash_of_files_to_track in os.walk(assets_output_dir):
        await track_additional_files(
            # sry for this shit ;d
            [os.path.join(dir_path, file).replace(f'{assets_output_dir}/', '') for file in hash_of_files_to_track],
            assets_output_dir,
            os.path.join(crawled_data_folder, assets_filename),
            save_hash_only=True
        )

    cleanup2()


async def download_telegram_android_and_extract_resources(session: aiohttp.ClientSession) -> None:
    await download_telegram_android_stable_dl_and_extract_resources(session)
    await download_telegram_android_beta_and_extract_resources(session)


async def download_telegram_android_stable_dl_and_extract_resources(session: aiohttp.ClientSession):
    download_url = 'https://telegram.org/dl/android/apk'

    await _download_telegram_android_and_extract_resources(session, download_url, 'android-stable-dl')


async def download_telegram_android_beta_and_extract_resources(session: aiohttp.ClientSession):
    download_url = 'https://telegram.org/dl/android/apk-public-beta'

    await _download_telegram_android_and_extract_resources(session, download_url, 'android-beta')


async def _download_telegram_android_and_extract_resources(
        session: aiohttp.ClientSession, download_url: str, folder_name: str
):
    crawled_data_folder = os.path.join(OUTPUT_CLIENTS_FOLDER, folder_name)

    if not download_url:
        return

    await asyncio.gather(
        download_file('https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.9.0.jar', 'tool.apk', session),
        download_file(download_url, 'android.apk', session),
    )

    def cleanup():
        os.path.isdir('android') and shutil.rmtree('android')
        os.remove('tool.apk')
        os.remove('android.apk')

    process = await asyncio.create_subprocess_exec(
        'java', '-jar', 'tool.apk', 'd', '-s', '-f', 'android.apk',
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.STDOUT
    )
    await process.communicate()

    if process.returncode != 0:
        cleanup()
        return

    files_to_track = [
        'res/values/strings.xml',
        'res/values/public.xml'
    ]
    await track_additional_files(files_to_track, 'android', crawled_data_folder)

    cleanup()


def parse_string_with_possible_json(input_string) -> dict:
    # chat gtp powered code:
    try:
        # Attempt to parse the entire input string as JSON
        json_object = json.loads(input_string)
    except json.JSONDecodeError as e:
        # Regular expression to find JSON objects within the string
        json_regex = r'{[^{}]*}'
        matches = re.findall(json_regex, input_string)

        if matches:
            # Use the first match as the extracted JSON
            json_object = json.loads(matches[0])
        else:
            raise ValueError('No JSON found within the input string.')

    return json_object


async def crawl_mini_app_wallet():
    crawled_data_folder = os.path.join(OUTPUT_MINI_APPS_FOLDER, 'wallet')

    def cleanup():
        os.path.isdir('wallet') and shutil.rmtree('wallet')

    async def _run_unwebpack_sourcemap(url: str):
        process = await asyncio.create_subprocess_exec(
            'python', 'unwebpack_sourcemap.py', '--make-directory', '--detect', url, 'wallet',
        )
        await process.communicate()

        if process.returncode != 0:
            cleanup()
            raise RuntimeError('unwebpack_sourcemap failed')

    crawled_unpacked_folder = os.path.join('wallet', 'webpack', 'wallet-react-form')

    await _run_unwebpack_sourcemap('https://walletbot.me/')

    webpack_chunks_db_path = os.path.join(crawled_unpacked_folder, 'webpack', 'runtime', 'get javascript chunk filename')
    webpack_chunks_db = parse_string_with_possible_json(open(webpack_chunks_db_path, 'r').read())
    for chunk_id, chunk_name in webpack_chunks_db.items():
        await _run_unwebpack_sourcemap(f'https://walletbot.me/static/js/{chunk_id}.{chunk_name}.js')

    files_to_track = []

    crawled_empty_0_folder = os.path.join(crawled_unpacked_folder, 'empty_0')
    crawled_src_folder = os.path.join(crawled_empty_0_folder, 'src')
    for root, folders, files in os.walk(crawled_src_folder):
        for file in files:
            files_to_track.append(os.path.join(root, file).replace(f'{crawled_empty_0_folder}/', ''))

    await track_additional_files(files_to_track, crawled_empty_0_folder, crawled_data_folder)

    cleanup()


async def collect_translations_paginated_content(url: str, session: aiohttp.ClientSession) -> str:
    import cssutils
    from bs4 import BeautifulSoup

    css_parser = cssutils.CSSParser(loglevel=logging.FATAL, raiseExceptions=False)

    headers = {'X-Requested-With': 'XMLHttpRequest'}
    content = dict()

    async def _get_page(offset: int):
        logger.info(f'Url: {url}, offset: {offset}')
        data = {'offset': offset, 'more': 1}

        try:
            new_offset = None
            async with session.post(
                    f'{PROTOCOL}{url}', data=data, headers=headers, allow_redirects=False, timeout=TIMEOUT
            ) as response:
                if (499 < response.status < 600) or (response.status != 200):
                    logger.debug(f'Resend cuz {response.status}')
                    new_offset = offset
                else:
                    res_json = await response.json(encoding='UTF-8')
                    if 'more_html' in res_json and res_json['more_html']:
                        res_json['more_html'] = re.sub(TRANSLATE_SUGGESTION_REGEX, '', res_json['more_html'])

                        soup = BeautifulSoup(res_json['more_html'], 'html.parser')
                        tr_items = soup.find_all('div', {'class': 'tr-key-row-wrap'})
                        for tr_item in tr_items:
                            tr_key = tr_item.find('div', {'class': 'tr-value-key'}).text

                            tr_url = tr_item.find('div', {'class': 'tr-key-row'})['data-href']
                            tr_url = f'https://translations.telegram.org{tr_url}'

                            tr_photo = tr_item.find('a', {'class': 'tr-value-photo'})
                            if tr_photo:
                                tr_photo = css_parser.parseStyle(tr_photo['style']).backgroundImage[5:-2]

                            tr_has_binding = tr_item.find('span', {'class': 'has-binding binding'})
                            tr_has_binding = tr_has_binding is not None

                            tr_values = tr_item.find_all('span', {'class': 'value'})
                            tr_value_singular, *tr_value_plural = [tr_value.decode_contents() for tr_value in tr_values]
                            tr_values = {'singular': tr_value_singular}
                            if tr_value_plural:
                                tr_values['plural'] = tr_value_plural[0]

                            content[tr_key] = {
                                'url': tr_url,
                                'photo_url': tr_photo,
                                'has_binding': tr_has_binding,
                                'values': tr_values,
                            }

                        new_offset = offset + 200

            new_offset and await _get_page(new_offset)
        except (ServerDisconnectedError, TimeoutError, ClientConnectorError):
            logger.warning(f'Client or timeout error. Retrying {url}; offset {offset}')
            await _get_page(offset)

    await _get_page(0)

    content = dict(sorted(content.items()))
    return json.dumps(content, indent=4, ensure_ascii=False)


async def track_mtproto_methods():
    #####################
    # PATH BROKEN PYROGRAM
    import pkgutil
    from pathlib import Path
    pyrogram_path = Path(pkgutil.get_loader('pyrogram').path).parent
    broken_class_path = os.path.join(pyrogram_path, 'raw', 'types', 'story_fwd_header.py')
    with open(broken_class_path, 'w', encoding='UTF-8') as f:
        # I rly don't want to fix bug in pyrogram about using reserved words as argument names
        f.write('class StoryFwdHeader: ...')
    #####################

    from pyrogram import Client

    kw = {
        'api_id': int(os.environ['TELEGRAM_API_ID']),
        'api_hash': os.environ['TELEGRAM_API_HASH'],
        'app_version': '@tgcrawl',
        'in_memory': True
    }

    test_dc = 2
    test_phone_prefix = '99966'
    test_phone_suffix = os.environ.get('TELEGRAM_TEST_PHONE_SUFFIX', random.randint(1000, 9999))
    test_phone_number = f'{test_phone_prefix}{test_dc}{test_phone_suffix}'
    test_phone_code = str(test_dc) * 5

    app_test = Client('crawler_test', phone_number=test_phone_number, phone_code=test_phone_code, test_mode=True, **kw)
    app = Client('crawler', session_string=os.environ['TELEGRAM_SESSION'], **kw)

    await asyncio.gather(app_test.start(), app.start())
    await asyncio.gather(_fetch_and_track_mtproto(app, ''), _fetch_and_track_mtproto(app_test, 'test'))


async def _fetch_and_track_mtproto(app, output_dir):
    from pyrogram.raw import functions
    from pyrogram.raw.types import InputStickerSetShortName

    configs = {
        'GetConfig': await app.invoke(functions.help.GetConfig()),
        'GetCdnConfig': await app.invoke(functions.help.GetCdnConfig()),
        # 'GetInviteText': await app.invoke(functions.help.GetInviteText()),
        # 'GetSupport': await app.invoke(functions.help.GetSupport()),
        # 'GetSupportName': await app.invoke(functions.help.GetSupportName()),
        # 'GetPassportConfig': await app.invoke(functions.help.GetPassportConfig(hash=0)),
        'GetCountriesList': await app.invoke(functions.help.GetCountriesList(lang_code='en', hash=0)),
        'GetAppConfig': await app.invoke(functions.help.GetAppConfig(hash=0)),
        # 'GetAppUpdate': await app.invoke(functions.help.GetAppUpdate(source='')),
        # 'AnimatedEmoji': await app.invoke(
        #     functions.messages.GetStickerSet(stickerset=InputStickerSetAnimatedEmoji(), hash=0)
        # ),
        'GetAvailableReactions': await app.invoke(functions.messages.GetAvailableReactions(hash=0)),
        'GetPremiumPromo': await app.invoke(functions.help.GetPremiumPromo()),
    }

    sticker_set_short_names = {
        'EmojiAnimations',
        'EmojiAroundAnimations',
        'EmojiShortAnimations',
        'EmojiAppearAnimations',
        'EmojiCenterAnimations',
        'AnimatedEmojies',
        'EmojiGenericAnimations',
    }

    if app.test_mode:
        sticker_set_short_names.add('PremiumGifts')
        sticker_set_short_names.add('StatusEmojiWhite')
    else:
        sticker_set_short_names.add('UtyaDuckFull')
        sticker_set_short_names.add('GiftsPremium')
        sticker_set_short_names.add('StatusPack')
        sticker_set_short_names.add('RestrictedEmoji')

    for short_name in sticker_set_short_names:
        sticker_set = await app.invoke(functions.messages.GetStickerSet(
            stickerset=InputStickerSetShortName(short_name=short_name), hash=0
        ))
        configs[f'sticker_set/{short_name}'] = sticker_set

    bots_usernames_to_track = {'BotFather', 'DurgerKingBot', 'asmico_attach_bot'}
    if app.test_mode:
        bots_usernames_to_track.add('izpremiumbot')
    else:
        bots_usernames_to_track.add('PremiumBot')

    bots_usernames_to_track.clear()
    for bot_username in bots_usernames_to_track:
        bot_peer = await app.resolve_peer(bot_username)
        bot_full = (await app.invoke(functions.users.GetFullUser(id=bot_peer)))
        configs[f'bot/{bot_username}'] = f'{{"full_user": {str(bot_full.full_user)}, "users": {str(bot_full.users)}}}'

    peers_to_track = set()
    if not app.test_mode:
        peers_to_track.add('invoice')
        peers_to_track.add('premium')

    peers_to_track.clear()
    for peer_id in peers_to_track:
        peer = await app.resolve_peer(peer_id)
        configs[f'peer/{peer_id}'] = peer

    configs['GetPremiumPromo'].users = []
    configs['GetPremiumPromo'].status_text = 'crawler'
    configs['GetPremiumPromo'].status_entities = []
    configs['GetPremiumPromo'].period_options = []

    configs['GetAppConfig'].hash = 'crawler'

    keys_to_hide = {'access_hash', 'autologin_token', 'file_reference', 'file_reference_base64', 'pending_suggestions'}
    if app.test_mode:
        keys_to_hide.add('dialog_filters_tooltip')

    def rem_rec(config):
        if not isinstance(config, dict):
            return

        for key, value in config.items():
            if isinstance(value, dict):
                rem_rec(value)
            elif isinstance(value, list):
                for item in value:
                    rem_rec(item)
            elif key == 'key' and value in keys_to_hide:
                config['value']['value'] = 'crawler'
            elif key in keys_to_hide:
                config[key] = 'crawler'

    methods_to_filter = {'GetAppConfig', 'GetAvailableReactions', 'GetPremiumPromo'}
    sticker_sets_to_filter = {f'sticker_set/{name}' for name in sticker_set_short_names}
    bots_to_filter = {f'bot/{name}' for name in bots_usernames_to_track}
    peers_to_filter = {f'peer/{name}' for name in peers_to_track}

    combined_filter = methods_to_filter | sticker_sets_to_filter | bots_to_filter | peers_to_filter
    for config_name in combined_filter:
        configs[config_name] = json.loads(str(configs[config_name]))
        rem_rec(configs[config_name])
        configs[config_name] = json.dumps(configs[config_name], ensure_ascii=False, indent=4)

    configs['GetConfig'].date = 0
    configs['GetConfig'].expires = 0
    configs['GetConfig'].autologin_token = 'crawler'
    configs['GetConfig'].dc_options = []

    for file, content in configs.items():
        filename = os.path.join(OUTPUT_MTPROTO_FOLDER, output_dir, f'{file}.json')
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        async with aiofiles.open(filename, 'w', encoding='utf-8') as w_file:
            await w_file.write(str(content))

    await app.stop()


def is_hashable_only_content_type(content_type) -> bool:
    hashable_only_content_types = (
        'png',
        'jpeg',
        'x-icon',
        'gif',
        'mp4',
        'webm',
        'zip',
        'stream',
    )

    for hashable_only_content_type in hashable_only_content_types:
        if hashable_only_content_type in content_type:
            return True

    return False


class RetryError(Exception):
    def __init__(self, message: str, new_url: Optional[str] = None):
        super().__init__(message)
        self.new_url = new_url


async def crawl(url: str, session: aiohttp.ClientSession, output_dir: str):
    while True:
        try:
            await _crawl(url, session, output_dir)
        except (RetryError, ServerDisconnectedError, TimeoutError, ClientConnectorError) as e:
            if isinstance(e, RetryError) and e.new_url is not None:
                url = e.new_url
            logger.warning(f'Client or timeout error ({e}). Retrying {url}')
        else:
            break


SLASH_RETRY_ATTEMPTED = set()


async def _crawl(url: str, session: aiohttp.ClientSession, output_dir: str):
    truncated_url = (url[:100] + '...') if len(url) > 100 else url

    logger.debug(f'Process {truncated_url}')
    async with session.get(f'{PROTOCOL}{url}', allow_redirects=False, timeout=TIMEOUT, headers=HEADERS) as response:
        code = response.status
        if 499 < code < 600:
            msg = f'Error 5XX. Retrying {truncated_url}'
            logger.warning(msg)
            raise RetryError(msg)

        if code not in {200, 304} and url not in CRAWL_STATUS_CODE_EXCLUSIONS:
            if code in {301, 302, 404}:
                base_url = url.rstrip('/')
                if base_url not in SLASH_RETRY_ATTEMPTED:
                    if url.endswith('/'):
                        flipped_url = base_url
                        logger.warning(f'{code} slash removal retry for {truncated_url}')
                    else:
                        flipped_url = f'{url}/'
                        logger.warning(f'{code} slash addition retry for {truncated_url}')

                    SLASH_RETRY_ATTEMPTED.add(base_url)
                    raise RetryError(f'{code} slash retry for {truncated_url}', new_url=flipped_url)

            content = await response.text()
            clean_content = content.replace('\n', ' ').replace('\r', ' ')
            truncated_content = (clean_content[:200] + '...') if len(clean_content) > 200 else clean_content
            logger.warning(f'Skip [{code}] {truncated_url}: {truncated_content}')

            return

        # bypass external slashes and so on
        url_parts = [p for p in url.split('/') if p not in ILLEGAL_PATH_CHARS]

        content_type = response.content_type

        # handle pure domains and html pages without ext in url as html do enable syntax highlighting
        page_type, _ = mimetypes.guess_type(url)

        ext = ''
        if page_type:
            ext = mimetypes.guess_extension(page_type) or ''
            if ext != '' and url.endswith(ext):
                ext = ''

        if url.endswith('.tl'):
            page_type = 'text/plain'

        if page_type is None or len(url_parts) == 1:
            ext = '.html'
            content_type = 'text/html'

        if re.search(TRANSLATIONS_EN_CATEGORY_URL_REGEX, url) or 'td.telegram.org/current' in url:
            ext = '.json'
            content_type = 'application/json'

        is_hashable_only = is_hashable_only_content_type(content_type)
        # amazing dirt for media files like
        # telegram.org/file/811140591/1/q7zZHjgES6s/9d121a89ffb0015837
        # with response content type HTML instead of image.
        # shame on you.
        # sometimes it returns a correct type.
        # noice load balancing
        is_sucking_file = '/file/' in url and 'text' in content_type

        # I don't add ext by content type for images, and so on cuz TG servers suck.
        # Some servers do not return a correct content type.
        # Some servers do...
        if is_hashable_only or is_sucking_file:
            ext = '.sha256'

        filename = os.path.join(output_dir, *url_parts) + ext
        os.makedirs(os.path.dirname(filename), exist_ok=True)

        if is_sucking_file or is_hashable_only:
            content = await response.read()
            async with aiofiles.open(filename, 'w', encoding='utf-8') as f:
                await f.write(get_hash(content))
            return

        content = await response.text(encoding='UTF-8')
        if re.search(TRANSLATIONS_EN_CATEGORY_URL_REGEX, url):
            content = await collect_translations_paginated_content(url, session)

        content = re.sub(PAGE_GENERATION_TIME_REGEX, '', content)
        content = re.sub(PAGE_API_HASH_REGEX, PAGE_API_HASH_TEMPLATE, content)
        content = re.sub(PASSPORT_SSID_REGEX, PASSPORT_SSID_TEMPLATE, content)
        content = re.sub(NONCE_REGEX, NONCE_TEMPLATE, content)
        content = re.sub(PROXY_CONFIG_SUB_NET_REGEX, PROXY_CONFIG_SUB_NET_TEMPLATE, content)
        content = re.sub(SPARKLE_SIG_REGEX, SPARKLE_SIG_TEMPLATE, content)
        content = re.sub(SPARKLE_SE_REGEX, SPARKLE_SE_TEMPLATE, content)
        content = re.sub(TON_RATE_REGEX, TON_RATE_TEMPLATE, content)
        content = re.sub(APK_BETA_TOKEN_REGEX, APK_BETA_TOKEN_TEMPLATE, content)

        # there is a problem with the files with the same name (in the same path) but different case
        # the content is random because of the async
        # there is only one page with this problem, for now:
        # - corefork.telegram.org/constructor/Updates
        # - corefork.telegram.org/constructor/updates
        async with aiofiles.open(filename, 'w', encoding='utf-8') as f:
            logger.debug(f'Write to {filename}')
            await f.write(content)


async def _crawl_web(session: aiohttp.ClientSession, input_filename: str, output_folder=None):
    with open(input_filename, 'r') as f:
        tracked_urls = set([l.replace('\n', '') for l in f.readlines()])

    await asyncio.gather(*[crawl(url, session, output_folder) for url in tracked_urls])


async def crawl_web(session: aiohttp.ClientSession):
    await _crawl_web(session, INPUT_FILENAME, OUTPUT_SITES_FOLDER)


async def crawl_web_res(session: aiohttp.ClientSession):
    await _crawl_web(session, INPUT_RES_FILENAME, OUTPUT_RESOURCES_FOLDER)


async def _collect_and_track_all_translation_keys():
    translations = dict()

    start_folder = 'en/'
    file_format = '.json'
    output_filename = 'translation_keys.json'

    for root, folder, files in os.walk(OUTPUT_TRANSLATIONS_FOLDER):
        for file in files:
            if not file.endswith(file_format) or file == output_filename:
                continue

            async with aiofiles.open(os.path.join(root, file), encoding='utf-8') as f:
                content = json.loads(await f.read())

                client = root[root.index(start_folder) + len(start_folder):]
                if client not in translations:
                    translations[client] = list()

                translations[client].extend(content.keys())

    for client in translations.keys():
        translations[client] = sorted(translations[client])

    translations = dict(sorted(translations.items()))

    async with aiofiles.open(os.path.join(OUTPUT_TRANSLATIONS_FOLDER, output_filename), 'w', encoding='utf-8') as f:
        await f.write(json.dumps(translations, indent=4))


async def crawl_web_tr(session: aiohttp.ClientSession):
    await _crawl_web(session, INPUT_TR_FILENAME, OUTPUT_TRANSLATIONS_FOLDER)
    await _collect_and_track_all_translation_keys()


async def start(mode: str):
    # Optimized TCP connector for web crawling
    tcp_connector = aiohttp.TCPConnector(
        ssl=False,             # Disable SSL verification for crawling
        use_dns_cache=False,          # Disable DNS caching
        force_close=True,             # Force close connections after use
        family=socket.AF_INET,        # Use IPv4 only to avoid potential IPv6 issues
    )

    async with aiohttp.ClientSession(connector=tcp_connector, trust_env=True) as session:
        mode == 'all' and await asyncio.gather(
            crawl_web(session),
            crawl_web_res(session),
            crawl_web_tr(session),
            track_mtproto_methods(),
            download_telegram_android_beta_and_extract_resources(session),
            download_telegram_macos_beta_and_extract_resources(session),
            download_telegram_ios_beta_and_extract_resources(session),
            crawl_mini_app_wallet(),
        )
        mode == 'web' and await asyncio.gather(
            crawl_web(session),
        )
        mode == 'web_res' and await asyncio.gather(
            crawl_web_res(session),
        )
        mode == 'web_tr' and await asyncio.gather(
            crawl_web_tr(session),
        )
        mode == 'server' and await asyncio.gather(
            track_mtproto_methods(),
        )
        mode == 'client' and await asyncio.gather(
            download_telegram_android_and_extract_resources(session),
            download_telegram_macos_beta_and_extract_resources(session),
            download_telegram_ios_beta_and_extract_resources(session),
        )
        mode == 'mini_app' and await asyncio.gather(
            crawl_mini_app_wallet(),
        )


if __name__ == '__main__':
    run_mode = 'all'
    if 'MODE' in os.environ:
        run_mode = os.environ['MODE']

    start_time = time()
    logger.info(f'Start crawling content of tracked urls...')
    uvloop.run(start(run_mode))
    logger.info(f'Stop crawling content in mode {run_mode}. {time() - start_time} sec.')
