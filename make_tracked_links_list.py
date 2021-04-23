import asyncio
import logging
import os
import re
from html import unescape
from time import time
from urllib.parse import unquote

import aiohttp

PROTOCOL = 'https://'
BASE_URL = 'telegram.org'
# its necessary to help crawler to find more links
HIDDEN_URLS = {
    'corefork.telegram.org',

    'telegram.org/privacy/gmailbot',
    'telegram.org/tos',
    'telegram.org/tour'
}
BASE_URL_REGEX = r'telegram.org'

EXCLUDE_RULES = {
    # '' means exclude all
    'translations.telegram.org': {
        '',
    },
    'bugs.telegram.org': {
        'c/',
    },
    'instantview.telegram.org': {
        'file/',

        'templates/',
        'samples/',
        'contest/',
    },
    'corefork.telegram.org': {
        'file/',

        'tdlib/',

        'constructor/',
        'method/',
        'type/',
    },
    'core.telegram.org': {
        'file/',

        'tdlib/',

        'constructor/',
        'method/',
        'type/',
    },
    'telegram.org': {
        'file/',
    }
}

DIRECT_LINK_REGEX = r'([-a-zA-Z0-9@:%._\+~#]{0,249}' + BASE_URL_REGEX + r')'
ABSOLUTE_LINK_REGEX = r'([-a-zA-Z0-9@:%._\+~#]{1,249}' + BASE_URL_REGEX + r'\b[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)'
RELATIVE_LINK_REGEX = r'\/([-a-zA-Z0-9\/@:%._\+~#]{0,249})'

DOM_ATTRS = ['href', 'src']

OUTPUT_FILENAME = os.environ.get('OUTPUT_FILENAME', 'tracked_links.txt')

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False)

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)

VISITED_LINKS = set()
LINKS_TO_TRACK = set()


def find_absolute_links(html: str) -> set[str]:
    absolute_links = set(re.findall(ABSOLUTE_LINK_REGEX, html))

    filtered_links = set()
    for link in absolute_links:
        def _():
            direct_link = re.findall(DIRECT_LINK_REGEX, link)[0]
            exceptions = EXCLUDE_RULES.get(direct_link, set())
            # optimization. when we want to exclude domain
            if '' in exceptions:
                return

            for exclude_path in exceptions:
                if exclude_path in link:
                    return

            filtered_links.add(link)

        _()
        # Yeah, I don't care about DRY

    return filtered_links


def find_relative_links(html: str, cur_link: str) -> set[str]:
    direct_cur_link = re.findall(DIRECT_LINK_REGEX, cur_link)[0]
    exceptions = EXCLUDE_RULES.get(direct_cur_link, set())
    # optimization. when we want to exclude domain
    if '' in exceptions:
        return set()

    relative_links = set()
    for attr in DOM_ATTRS:
        regex = f'{attr}="{RELATIVE_LINK_REGEX}'
        links = re.findall(regex, html)

        for link in links:
            def _():
                for exclude_path in exceptions:
                    if exclude_path in link:
                        return

                if link.startswith('/'):
                    # bypass //www.apple and etc shit ;d
                    if find_absolute_links(link):
                        # absolute links starting with double slash
                        relative_links.add(link[1::])
                else:
                    relative_links.add(f'{direct_cur_link}/{link}')

            _()

    return relative_links


def cleanup_links(links: set[str]) -> set[str]:
    cleaned_links = set()
    for tmp_link in links:
        # normalize link
        link = unquote(tmp_link)
        link = unescape(link)
        link = link.replace('www.', '')
        link = link.replace('http://', '').replace('https://', '')
        # skip anchor links
        if '#' in link:
            continue

        link_parts = link.split('.')
        if '@' in link_parts[0]:
            continue

        cleaned_links.add(link)

    return cleaned_links


async def crawl(url: str, session: aiohttp.ClientSession):
    if url.endswith('/'):
        url = url[:-1:]
    if url in VISITED_LINKS or '"' in url:
        return
    VISITED_LINKS.add(url)

    try:
        logger.info(f'[{len(VISITED_LINKS)}] Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False) as response:
            status_code = response.status
            content_type = response.headers.get('content-type')

            if status_code != 200:
                return

            if 'text/html' in content_type:
                LINKS_TO_TRACK.add(url)

                html = await response.text()
                absolute_links = cleanup_links(find_absolute_links(html))
                relative_links = cleanup_links(find_relative_links(html, url))

                sub_links = absolute_links | relative_links
                await asyncio.gather(*[crawl(url, session) for url in sub_links])
            elif 'application/javascript' in content_type:
                LINKS_TO_TRACK.add(url)
            elif 'text/css' in content_type:
                LINKS_TO_TRACK.add(url)
            elif 'application/json' in content_type:
                LINKS_TO_TRACK.add(url)
            else:
                # TODO track hashes of image/svg/video content types
                logger.info(f'Unhandled type: {content_type}')
    except:
        logger.warning('Codec can\'t decode byte. So its was a tgs file')


async def start(url_list: set[str]):
    async with aiohttp.ClientSession(connector=CONNECTOR) as session:
        await asyncio.gather(*[crawl(url, session) for url in url_list])


if __name__ == '__main__':
    HIDDEN_URLS.add(BASE_URL)

    logger.info('Start crawling...')
    start_time = time()
    asyncio.get_event_loop().run_until_complete(start(HIDDEN_URLS))
    logger.info(f'Stop crawling. {time() - start_time} sec.')

    with open(OUTPUT_FILENAME, 'w') as f:
        f.write('\n'.join(sorted(LINKS_TO_TRACK)))
