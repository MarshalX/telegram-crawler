import asyncio
import logging
import os
import re
from asyncio.exceptions import TimeoutError
from html import unescape
from time import time
from urllib.parse import unquote

import aiohttp
from aiohttp import ClientConnectorError, ServerDisconnectedError

PROTOCOL = 'https://'
BASE_URL = 'telegram.org'
# it's necessary to help crawler to find more links
HIDDEN_URLS = {
    'corefork.telegram.org',
    'corefork.telegram.org/getProxyConfig',

    'telegram.org/privacy/gmailbot',
    'telegram.org/tos',
    'telegram.org/tour',
    'telegram.org/evolution',

    'desktop.telegram.org/changelog',
    'td.telegram.org/current',
    'td.telegram.org/current2',

    'osx.telegram.org/updates/versions.xml',    # stable
    'api.appcenter.ms/v0.1/public/sparkle/apps/6ed2ac30-49e1-4073-87c2-f1ffcb74e81f',   # beta

    'instantview.telegram.org/rules',

    'core.telegram.org/resources/cidr.txt',
    'core.telegram.org/apple_privacy',
    'core.telegram.org/getProxyConfig',

    'core.telegram.org/video_stickers',
    'core.telegram.org/stickers',

    'promote.telegram.org',
    'contest.com',

    # web apps beta
    'comments.app/test_webview',    # old
    'webappcontent.telegram.org/demo',  # new
    'webappcontent.telegram.org/cafe',  # demo 2
}
ADDITIONAL_URLS = {
    'raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/tl/mtproto.tl',
    'raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/Resources/tl/api.tl',
    'raw.githubusercontent.com/tdlib/td/master/td/generate/scheme/telegram_api.tl',
    'raw.githubusercontent.com/tdlib/td/master/td/generate/scheme/td_api.tl',
}
BASE_URL_REGEX = r'telegram.org'

# disable crawling sub links for specific domains and url patterns
CRAWL_RULES = {
    # every rule is regex
    # empty string means match any url
    # allow rules with higher priority than deny
    'translations.telegram.org': {
        'allow': {
            r'^[^/]*$',  # root
            r'org/[^/]*/$',  # 1 lvl sub
            r'/css/[a-z-_.]+$',  # css files
            r'/en/[a-z_]+/$',  # 1 lvl after /en/
            r'/en/[a-z_]+/[a-z_]+/$',  # 2 lvl after /en/. for example, /en/ios/unsorted/
        },
        'deny': {
            '',  # all
        }
    },
    'bugs.telegram.org': {  # crawl first page of cards sorted by rating
        'deny': {
            # r'/c/[0-9]+/[0-9]+',  # disable comments
            '',
        },
    },
    'instantview.telegram.org': {
        'deny': {
            'file/',

            r'templates/.+',
            'samples/',
            'contest',
        },
    },
    'core.telegram.org': {
        'deny': {
            'file/',

            'bots/payments',

            'tdlib/docs/classtd',

            'validatedRequestedInfo',
        },
    },
    'corefork.telegram.org': {
        'deny': {
            'file/',

            'bots/payments',

            'tdlib/docs/classtd',

            'validatedRequestedInfo',
        },
    },
    'telegram.org': {
        'deny': {
            r'apps$',
            r'img/StickerExample.psd$',
        },
    },
    'webz.telegram.org': {
        'deny': {
            '',
        },
    },
    'webk.telegram.org': {
        'deny': {
            '',
        },
    },
}

DIRECT_LINK_REGEX = r'([-a-zA-Z0-9@:%._\+~#]{0,249}' + BASE_URL_REGEX + r')'
ABSOLUTE_LINK_REGEX = r'([-a-zA-Z0-9@:%._\+~#]{0,248}' + BASE_URL_REGEX + r'\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)'
RELATIVE_LINK_REGEX = r'\/(?!\/)([-a-zA-Z0-9\/@:%._\+~#]{0,249})'
RELATIVE_JS_SCRIPTS_REGEX = r'["\'](.*\.js)["\'\?]'

DOM_ATTRS = ['href', 'src']

OUTPUT_FILENAME = os.environ.get('OUTPUT_FILENAME', 'tracked_links.txt')
COMPARE_OUTPUT_WITH_FILENAME = os.environ.get('COMPARE_OUTPUT_WITH_FILENAME', OUTPUT_FILENAME)

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False)
TIMEOUT = aiohttp.ClientTimeout(total=10)

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)

VISITED_LINKS = set()
LINKS_TO_TRACK = set()


def should_exclude(url: str) -> bool:
    direct_link = re.findall(DIRECT_LINK_REGEX, url)[0]
    domain_rules = CRAWL_RULES.get(direct_link)
    if not domain_rules:
        return False

    allow_rules = domain_rules.get('allow', set())
    deny_rules = domain_rules.get('deny', set())

    exclude = False

    for regex in deny_rules:
        if re.search(regex, url):
            exclude = True
            break

    for regex in allow_rules:
        if re.search(regex, url):
            exclude = False
            break

    return exclude


def find_absolute_links(html: str) -> set[str]:
    absolute_links = set(re.findall(ABSOLUTE_LINK_REGEX, html))

    return {link for link in absolute_links if not should_exclude(link)}


def find_relative_links(html: str, cur_link: str) -> set[str]:
    matches = re.findall(DIRECT_LINK_REGEX, cur_link)
    if not matches:
        return set()

    direct_cur_link = re.findall(DIRECT_LINK_REGEX, cur_link)[0]
    # optimization. when we want to exclude domain
    if should_exclude(cur_link):
        return set()

    relative_links = set()
    for attr in DOM_ATTRS:
        regex = f'{attr}="{RELATIVE_LINK_REGEX}'
        links = re.findall(regex, html)

        for link in links:
            url = f'{direct_cur_link}/{link}'
            if not should_exclude(url):
                relative_links.add(url)

    return relative_links


def find_relative_scripts(code: str, cur_link: str) -> set[str]:
    matches = re.findall(DIRECT_LINK_REGEX, cur_link)
    if not matches:
        return set()

    direct_cur_link = re.findall(DIRECT_LINK_REGEX, cur_link)[0]

    relative_links = set()
    for link in re.findall(RELATIVE_JS_SCRIPTS_REGEX, code):
        # dirty magic for specific cases
        if '/' in link:    # path to file from the root
            url = f'{direct_cur_link}/{link}'
        else:   # its relative link from current folder. Not from the root
            current_folder_link, *_ = cur_link.rsplit('/', 1)
            url = f'{current_folder_link}/{link}'

        if not should_exclude(url):
            relative_links.add(url)

    return relative_links


def cleanup_links(links: set[str]) -> set[str]:
    cleaned_links = set()
    for tmp_link in links:
        # normalize link
        link = unquote(tmp_link)
        link = unescape(link)
        link = link.replace('www.', '')
        link = link.replace('http://', '').replace('https://', '')
        link = link.replace('//', '/')  # not a universal solution
        link = link.replace('"', '')  # regex fix hack

        # skip anchor links
        if '#' in link:
            continue

        # remove get params from link
        if '?' in link:
            link = ''.join(link.split('?')[:-1])

        # skip mailto:
        link_parts = link.split('.')
        if '@' in link_parts[0]:
            continue

        cleaned_links.add(link)

    return cleaned_links


def is_trackable_content_type(content_type) -> bool:
    trackable_content_types = (
        'css',
        'plain',
        'json',
        'svg',
        'png',
        'jpeg',
        'x-icon',
        'gif',
        'mp4',
        'webm',
        'application/octet-stream',    # td updates
    )

    for trackable_content_type in trackable_content_types:
        if trackable_content_type in content_type:
            return True

    return False


async def crawl(url: str, session: aiohttp.ClientSession):
    if url in VISITED_LINKS:
        return
    VISITED_LINKS.add(url)

    try:
        logger.info(f'[{len(VISITED_LINKS)}] Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False, timeout=TIMEOUT) as response:
            content_type = response.headers.get('content-type')

            if response.status // 100 == 5:
                VISITED_LINKS.remove(url)
                logger.warning(f'Error 5XX. Retrying {url}')
                return await asyncio.gather(crawl(url, session))

            if response.status not in {200, 304}:
                if response.status != 302:
                    content = await response.text(encoding='UTF-8')
                    logger.debug(f'Skip {url} because status code == {response.status}. Content: {content}')
                return

            if 'text' in content_type or 'javascript' in content_type:
                LINKS_TO_TRACK.add(url)

                content = await response.text(encoding='UTF-8')
                absolute_links = cleanup_links(find_absolute_links(content))

                relative_links_finder = find_relative_links
                if 'javascript' in content_type:
                    relative_links_finder = find_relative_scripts

                relative_links = cleanup_links(relative_links_finder(content, url))

                sub_links = absolute_links | relative_links
                await asyncio.gather(*[crawl(url, session) for url in sub_links])
            elif is_trackable_content_type(content_type):
                LINKS_TO_TRACK.add(url)
            else:
                # for example, zip with update of macOS client
                logger.info(f'Unhandled type: {content_type} from {url}')

            # telegram url can work with and without trailing slash (no redirect). P.S. not on every subdomain ;d
            # so this is a problem when we have random behavior with link will be added
            # this if resolve this issue. If available both link we prefer without trailing slash
            without_trailing_slash = url[:-1:] if url.endswith('/') else url
            if without_trailing_slash in LINKS_TO_TRACK and \
                    f'{without_trailing_slash}/' in LINKS_TO_TRACK:
                LINKS_TO_TRACK.remove(f'{without_trailing_slash}/')
    except UnicodeDecodeError:
        logger.warning(f'Codec can\'t decode bytes. So it was a tgs file or response with broken content type {url}')
    # except ClientConnectorError:
    #     logger.warning(f'Wrong link: {url}')
    except (ServerDisconnectedError, TimeoutError, ClientConnectorError):
        logger.warning(f'Client or timeout error. Retrying {url}')
        VISITED_LINKS.remove(url)
        # sleep + count of attempts?
        await asyncio.gather(crawl(url, session))


async def start(url_list: set[str]):
    async with aiohttp.ClientSession(connector=CONNECTOR) as session:
        await asyncio.gather(*[crawl(url, session) for url in url_list])


if __name__ == '__main__':
    HIDDEN_URLS.add(BASE_URL)
    LINKS_TO_TRACK = LINKS_TO_TRACK | ADDITIONAL_URLS

    logger.info('Start crawling links...')
    start_time = time()
    asyncio.get_event_loop().run_until_complete(start(HIDDEN_URLS))
    logger.info(f'Stop crawling links. {time() - start_time} sec.')

    try:
        with open(COMPARE_OUTPUT_WITH_FILENAME, 'r') as f:
            OLD_URL_LIST = set([l.replace('\n', '') for l in f.readlines()])

        logger.info(f'Is equal: {OLD_URL_LIST == LINKS_TO_TRACK}')
        logger.info(f'Deleted: {OLD_URL_LIST - LINKS_TO_TRACK}')
        logger.info(f'Added: {LINKS_TO_TRACK - OLD_URL_LIST}')
    except IOError:
        pass

    with open(OUTPUT_FILENAME, 'w') as f:
        f.write('\n'.join(sorted(LINKS_TO_TRACK)))
