import asyncio
import logging
import os
import re
import subprocess
from asyncio.exceptions import TimeoutError
from string import punctuation, whitespace
from time import time

import aiofiles
import aiohttp
from aiohttp import ClientConnectorError

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

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False)
TIMEOUT = aiohttp.ClientTimeout(total=10)

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)


async def download_apk_and_extract_resources(session: aiohttp.ClientSession):
    api_base = 'https://install.appcenter.ms/api/v0.1'
    parameterized_url = 'apps/drklo-2kb-ghpo/telegram-beta-2/distribution_groups/all-users-of-telegram-beta-2'
    url = f'{api_base}/{parameterized_url}'

    latest_id = download_url = None

    async with session.get(f'{url}/public_releases') as response:
        if response.status != 200: return
        json = await response.json(encoding='UTF-8')
        if json and json[0]:
            latest_id = json[0]['id']

    if not latest_id:
        return

    async with session.get(f'{url}/releases/{latest_id}') as response:
        if response.status != 200: return
        json = await response.json(encoding='UTF-8')
        if not json: return
        download_url = json['download_url']

    if not download_url:
        return

    async def download_file(url, path):
        async with session.get(url) as response:
            if response.status != 200: return
            async with aiofiles.open(path, mode='wb') as f:
                await f.write(await response.read())

    await download_file('https://bitbucket.org/iBotPeaches/apktool/downloads/apktool_2.6.1.jar', 'tool.apk')
    await download_file(download_url, 'app.apk')

    # synced but I don't have about it ;d
    subprocess.call(['java', '-jar', 'tool.apk', 'd', '-s', '-f', 'app.apk'])

    path_to_strings = 'res/values/strings.xml'

    filename = os.path.join(OUTPUT_FOLDER, 'telegram-beta-android', path_to_strings)
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    async with aiofiles.open(filename, 'w') as f:
        async with aiofiles.open(os.path.join('app', path_to_strings), 'r') as ff:
            await f.write(await ff.read())


async def collect_translations_paginated_content(url: str, session: aiohttp.ClientSession) -> str:
    headers = {'X-Requested-With': 'XMLHttpRequest'}
    content = list()

    async def _get_page(offset: int):
        logger.info(f'Url: {url}, offset: {offset}')
        data = {'offset': offset, 'more': 1}

        try:
            async with session.post(
                    f'{PROTOCOL}{url}', data=data, headers=headers, allow_redirects=False, timeout=TIMEOUT
            ) as response:
                if response.status != 200:
                    logger.debug(f'Resend cuz {response.status}')
                    return await asyncio.gather(_get_page(offset))

                json = await response.json(encoding='UTF-8')
                if 'more_html' in json and json['more_html']:
                    content.append(json['more_html'])
                    await asyncio.gather(_get_page(offset + 200))
        except (TimeoutError, ClientConnectorError):
            logger.warning(f'Client or timeout error. Retrying {url}; offset {offset}')
            await asyncio.gather(_get_page(offset))

    await _get_page(0)

    return '\n'.join(content)


async def crawl(url: str, session: aiohttp.ClientSession):
    try:
        logger.info(f'Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False, timeout=TIMEOUT) as response:
            if response.status // 100 == 5:
                logger.warning(f'Error 5XX. Retrying {url}')
                return await asyncio.gather(crawl(url, session))

            if response.status not in {200, 304}:
                if response.status != 302:
                    content = await response.text()
                    logger.debug(f'Skip {url} because status code == {response.status}. Content: {content}')
                return

            # bypass external slashes and so on
            url_parts = [p for p in url.split('/') if p not in ILLEGAL_PATH_CHARS]
            # handle pure domains and html pages without ext in url
            ext = '.html' if '.' not in url_parts[-1] or len(url_parts) == 1 else ''

            filename = OUTPUT_FOLDER + '/'.join(url_parts) + ext

            content = await response.text(encoding='UTF-8')
            if re.search(TRANSLATIONS_EN_CATEGORY_URL_REGEX, url):
                content = await collect_translations_paginated_content(url, session)

            os.makedirs(os.path.dirname(filename), exist_ok=True)
            async with aiofiles.open(filename, 'w') as f:
                content = re.sub(PAGE_GENERATION_TIME_REGEX, '', content)
                content = re.sub(PAGE_API_HASH_REGEX, PAGE_API_HASH_TEMPLATE, content)
                content = re.sub(PASSPORT_SSID_REGEX, PASSPORT_SSID_TEMPLATE, content)
                content = re.sub(NONCE_REGEX, NONCE_TEMPLATE, content)
                content = re.sub(PROXY_CONFIG_SUB_NET_REGEX, PROXY_CONFIG_SUB_NET_TEMPLATE, content)
                content = re.sub(TRANSLATE_SUGGESTION_REGEX, '', content)

                logger.info(f'Write to {filename}')
                await f.write(content)
    except (TimeoutError, ClientConnectorError):
        logger.warning(f'Client or timeout error. Retrying {url}')
        await asyncio.gather(crawl(url, session))


async def start(url_list: set[str]):
    async with aiohttp.ClientSession(connector=CONNECTOR) as session:
        await asyncio.gather(*[crawl(url, session) for url in url_list])

        # yeap it will be called each run, and what? ;d
        await download_apk_and_extract_resources(session)


if __name__ == '__main__':
    with open(INPUT_FILENAME, 'r') as f:
        tracked_urls = set([l.replace('\n', '') for l in f.readlines()])

    logger.info(f'Start crawling content of {len(tracked_urls)} tracked urls...')
    start_time = time()
    asyncio.get_event_loop().run_until_complete(start(tracked_urls))
    logger.info(f'Stop crawling content. {time() - start_time} sec.')
