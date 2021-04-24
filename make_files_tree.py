import asyncio
import logging
import os
import re
from asyncio.exceptions import TimeoutError
from string import punctuation, whitespace
from time import time

import aiofiles
import aiohttp
from aiohttp import ClientConnectorError

PROTOCOL = 'https://'
ILLEGAL_PATH_CHARS = punctuation.replace('.', '') + whitespace

INPUT_FILENAME = os.environ.get('INPUT_FILENAME', 'tracked_links.txt')
OUTPUT_FOLDER = os.environ.get('OUTPUT_FOLDER', 'data/')

PAGE_GENERATION_TIME_REGEX = r'<!-- page generated in .+ -->'
PAGE_API_HASH_REGEX = r'\?hash=[a-z0-9]+'
PAGE_API_HASH_TEMPLATE = '?hash=telegram-crawler'

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False)
TIMEOUT = aiohttp.ClientTimeout(total=30)

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)


async def crawl(url: str, session: aiohttp.ClientSession):
    try:
        logger.info(f'Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False) as response:
            if response.status != 200:
                return

            # bypass external slashes and so on
            url_parts = [p for p in url.split('/') if p not in ILLEGAL_PATH_CHARS]
            # handle pure domains and html pages without ext in url
            ext = '.html' if '.' not in url_parts[-1] or len(url_parts) == 1 else ''

            filename = OUTPUT_FOLDER + '/'.join(url_parts) + ext

            os.makedirs(os.path.dirname(filename), exist_ok=True)
            async with aiofiles.open(filename, 'w') as f:
                content = await response.text()
                content = re.sub(PAGE_GENERATION_TIME_REGEX, '', content)
                content = re.sub(PAGE_API_HASH_REGEX, PAGE_API_HASH_TEMPLATE, content)

                logger.info(f'Write to {filename}')
                await f.write(content)
    except (TimeoutError, ClientConnectorError):
        await asyncio.gather(crawl(url, session))


async def start(url_list: set[str]):
    async with aiohttp.ClientSession(connector=CONNECTOR) as session:
        await asyncio.gather(*[crawl(url, session) for url in url_list])


if __name__ == '__main__':
    with open(INPUT_FILENAME, 'r') as f:
        tracked_urls = set([l.replace('\n', '') for l in f.readlines()])

    logger.info(f'Start crawling content of {len(tracked_urls)} tracked urls...')
    start_time = time()
    asyncio.get_event_loop().run_until_complete(start(tracked_urls))
    logger.info(f'Stop crawling content. {time() - start_time} sec.')
