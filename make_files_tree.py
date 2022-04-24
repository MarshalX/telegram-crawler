import asyncio
import logging
import os
import platform
import re
import shutil
import sys
import zipfile
import hashlib
from asyncio.exceptions import TimeoutError
from string import punctuation, whitespace
from time import time
from typing import List

import aiofiles
import aiohttp
from aiohttp import ClientConnectorError, ServerDisconnectedError

PROTOCOL = 'https://'
ILLEGAL_PATH_CHARS = punctuation.replace('.', '') + whitespace

DYNAMIC_PART_MOCK = 'telegram-crawler'

INPUT_FILENAME = os.environ.get('INPUT_FILENAME', 'tracked_links.txt')
OUTPUT_FOLDER = os.environ.get('OUTPUT_FOLDER', 'data/')

TRANSLATIONS_EN_CATEGORY_URL_REGEX = r'/en/[a-z_]+/[a-z_]+/$'

PAGE_GENERATION_TIME_REGEX = r'<!-- page generated in .+ -->'
PAGE_API_HASH_REGEX = r'\?hash=[a-z0-9]+'
PAGE_API_HASH_TEMPLATE = f'?hash={DYNAMIC_PART_MOCK}'
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

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False)
TIMEOUT = aiohttp.ClientTimeout(total=10)

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)


def get_hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


async def download_file(url, path, session):
    async with session.get(url) as response:
        if response.status != 200:
            return

        content = await response.read()

    async with aiofiles.open(path, mode='wb') as f:
        await f.write(content)


async def get_download_link_of_latest_appcenter_release(parameterized_url: str, session: aiohttp.ClientSession):
    api_base = 'https://install.appcenter.ms/api/v0.1'
    base_url = f'{api_base}/{parameterized_url}'

    async def make_req(url):
        async with session.get(url) as response:
            if response.status != 200:
                return

            return await response.json(encoding='UTF-8')

    json = await make_req(f'{base_url}/public_releases')
    if json and json[0]:
        latest_id = json[0]['id']
    else:
        return

    json = await make_req(f'{base_url}/releases/{latest_id}')
    if json:
        return json['download_url']

    return None


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
            content = re.sub(r'name="APKTOOL_DUMMY_.*" id', 'name="tgcrawl" id', content)

        filename = os.path.join(OUTPUT_FOLDER, output_dir_name, file)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        async with aiofiles.open(filename, 'w', encoding='utf-8') as w_file:
            await w_file.write(content)


async def download_telegram_macos_beta_and_extract_resources(session: aiohttp.ClientSession):
    parameterized_url = 'apps/keepcoder/telegram-swift/distribution_groups/public'
    download_url = await get_download_link_of_latest_appcenter_release(parameterized_url, session)

    if not download_url:
        return

    crawled_data_folder = 'telegram-beta-macos'
    client_folder_name = 'macos'
    client_archive_name = 'macos.zip'

    assets_output_dir = 'macos_assets'
    assets_filename = 'Assets.car'
    assets_extractor = 'acextract'
    tool_archive_name = f'{assets_extractor}.zip'

    tool_download_url = 'https://github.com/bartoszj/acextract/releases/download/2.2/acextract.zip'

    if 'darwin' not in platform.system().lower():
        await download_file(download_url, client_archive_name, session)
    else:
        await asyncio.gather(
            download_file(download_url, client_archive_name, session),
            download_file(tool_download_url, tool_archive_name, session),
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
    hash_of_files_to_track = [f'{resources_path}/{i}' for i in hash_of_files_to_track]
    await track_additional_files(hash_of_files_to_track, client_folder_name, crawled_data_folder, save_hash_only=True)

    def cleanup1():
        os.path.isdir(client_folder_name) and shutil.rmtree(client_folder_name)
        os.remove(client_archive_name)

    # .car crawler works only in macOS
    if 'darwin' not in platform.system().lower():
        cleanup1()
        return

    # synced
    with zipfile.ZipFile(tool_archive_name, 'r') as f:
        f.extractall(assets_extractor)

    path_to_car = os.path.join(client_folder_name, resources_path, assets_filename)
    path_to_extractor = os.path.join(assets_extractor, assets_extractor)
    await (await asyncio.create_subprocess_exec('chmod', '+x', path_to_extractor)).communicate()
    process = await asyncio.create_subprocess_exec(path_to_extractor, '-i', path_to_car, '-o', assets_output_dir)
    await process.communicate()

    def cleanup2():
        cleanup1()
        os.path.isdir(assets_output_dir) and shutil.rmtree(assets_output_dir)
        os.path.isdir(assets_extractor) and shutil.rmtree(assets_extractor)
        os.remove(tool_archive_name)

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


async def download_telegram_android_beta_and_extract_resources(session: aiohttp.ClientSession):
    parameterized_url = 'apps/drklo-2kb-ghpo/telegram-beta-2/distribution_groups/all-users-of-telegram-beta-2'
    download_url = await get_download_link_of_latest_appcenter_release(parameterized_url, session)

    if not download_url:
        return

    await asyncio.gather(
        download_file('https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.6.1.jar', 'tool.apk', session),
        download_file(download_url, 'android.apk', session),
    )

    def cleanup():
        os.path.isdir('android') and shutil.rmtree('android')
        os.remove('tool.apk')
        os.remove('android.apk')

    process = await asyncio.create_subprocess_exec('java', '-jar', 'tool.apk', 'd', '-s', '-f', 'android.apk')
    await process.communicate()

    if process.returncode != 0:
        cleanup()
        return

    files_to_track = [
        'res/values/strings.xml',
        'res/values/public.xml'
    ]
    await track_additional_files(files_to_track, 'android', 'telegram-beta-android')

    cleanup()


async def collect_translations_paginated_content(url: str, session: aiohttp.ClientSession) -> str:
    headers = {'X-Requested-With': 'XMLHttpRequest'}
    content = list()

    async def _get_page(offset: int):
        logger.info(f'Url: {url}, offset: {offset}')
        data = {'offset': offset, 'more': 1}

        try:
            new_offset = None
            async with session.post(
                    f'{PROTOCOL}{url}', data=data, headers=headers, allow_redirects=False, timeout=TIMEOUT
            ) as response:
                if response.status != 200:
                    logger.debug(f'Resend cuz {response.status}')
                    new_offset = offset
                else:
                    json = await response.json(encoding='UTF-8')
                    if 'more_html' in json and json['more_html']:
                        content.append(json['more_html'])
                        new_offset = offset + 200

            new_offset and await _get_page(new_offset)
        except (TimeoutError, ClientConnectorError):
            logger.warning(f'Client or timeout error. Retrying {url}; offset {offset}')
            await _get_page(offset)

    await _get_page(0)

    return '\n'.join(content)


def is_hashable_only_content_type(content_type) -> bool:
    hashable_only_content_types = (
        'png',
        'jpeg',
        'x-icon',
        'gif',
        'mp4',
        'webm',
    )

    for hashable_only_content_type in hashable_only_content_types:
        if hashable_only_content_type in content_type:
            return True

    return False


class RetryError(Exception):
    ...


async def crawl(url: str, session: aiohttp.ClientSession):
    try:
        logger.info(f'Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False, timeout=TIMEOUT) as response:
            if response.status // 100 == 5:
                msg = f'Error 5XX. Retrying {url}'
                logger.warning(msg)
                raise RetryError(msg)

            if response.status not in {200, 304}:
                if response.status != 302:
                    content = await response.text()
                    logger.debug(f'Skip {url} because status code == {response.status}. Content: {content}')
                return

            # bypass external slashes and so on
            url_parts = [p for p in url.split('/') if p not in ILLEGAL_PATH_CHARS]

            is_hashable_only = is_hashable_only_content_type(response.content_type)
            # amazing dirt for media files like
            # telegram.org/file/811140591/1/q7zZHjgES6s/9d121a89ffb0015837
            # with response content type HTML instead of image. Shame on you
            # sometimes it returns correct type. noice load balancing
            is_sucking_file = '/file/' in url and 'text' in response.content_type

            # handle pure domains and html pages without ext in url
            ext = '.html' if '.' not in url_parts[-1] or len(url_parts) == 1 else ''

            # I don't add ext by content type for images and so on cuz TG servers sucks.
            # Some servers do not return correct content type. Some servers do...
            if is_hashable_only or is_sucking_file:
                ext = ''

            filename = OUTPUT_FOLDER + '/'.join(url_parts) + ext
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
            content = re.sub(TRANSLATE_SUGGESTION_REGEX, '', content)
            content = re.sub(SPARKLE_SIG_REGEX, SPARKLE_SIG_TEMPLATE, content)
            content = re.sub(SPARKLE_SE_REGEX, SPARKLE_SE_TEMPLATE, content)

            async with aiofiles.open(filename, 'w', encoding='utf-8') as f:
                logger.info(f'Write to {filename}')
                await f.write(content)
    except (ServerDisconnectedError, TimeoutError, ClientConnectorError):
        logger.warning(f'Client or timeout error. Retrying {url}')
        await crawl(url, session)


async def start(url_list: set[str], mode: int):
    async with aiohttp.ClientSession(connector=CONNECTOR) as session:
        mode == 0 and await asyncio.gather(
            *[crawl(url, session) for url in url_list],
            download_telegram_android_beta_and_extract_resources(session),
            download_telegram_macos_beta_and_extract_resources(session),
        )
        mode == 1 and await asyncio.gather(*[crawl(url, session) for url in url_list])
        mode == 2 and await download_telegram_android_beta_and_extract_resources(session)
        mode == 3 and await download_telegram_macos_beta_and_extract_resources(session)


if __name__ == '__main__':
    run_mode = int(sys.argv[1]) if len(sys.argv) > 1 else 0

    with open(INPUT_FILENAME, 'r') as f:
        tracked_urls = set([l.replace('\n', '') for l in f.readlines()])

    start_time = time()
    logger.info(f'Start crawling content of {len(tracked_urls)} tracked urls...')
    asyncio.get_event_loop().run_until_complete(start(tracked_urls, run_mode))
    logger.info(f'Stop crawling content in mode {run_mode}. {time() - start_time} sec.')
