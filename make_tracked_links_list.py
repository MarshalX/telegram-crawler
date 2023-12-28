import asyncio
import logging
import os
import re
from asyncio.exceptions import TimeoutError
from html import unescape
from time import time
from typing import Set
from urllib.parse import unquote

import aiohttp
from aiohttp import ClientConnectorError, ServerDisconnectedError

PROTOCOL = 'https://'
BASE_URL = 'telegram.org'
# it's necessary to help crawler to find more links
HIDDEN_URLS = {
    'blogfork.telegram.org',

    'corefork.telegram.org',
    'corefork.telegram.org/getProxyConfig',

    'telegram.org/privacy/gmailbot',
    'telegram.org/tos',
    'telegram.org/tos/mini-apps',
    'telegram.org/tour',
    'telegram.org/evolution',

    'desktop.telegram.org/changelog',
    'td.telegram.org/current',
    'td.telegram.org/current2',
    'td.telegram.org/current5',    # tdx

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
    # 'a-webappcontent.stel.com/demo',
    # 'a-webappcontent.stel.com/cafe',

    # 'fragment.com/about',
    # 'fragment.com/privacy',
    # 'fragment.com/terms',
    'fragment.com/css/auction.css',
    'fragment.com/js/auction.js',
}
ADDITIONAL_URLS = {
    'raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/SourceFiles/mtproto/scheme/mtproto.tl',
    'raw.githubusercontent.com/telegramdesktop/tdesktop/dev/Telegram/SourceFiles/mtproto/scheme/api.tl',
    'raw.githubusercontent.com/tdlib/td/master/td/generate/scheme/telegram_api.tl',
    'raw.githubusercontent.com/tdlib/td/master/td/generate/scheme/secret_api.tl',
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
    'osx.telegram.org': {
      'deny': {
          'updates/Telegram'
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
            r'templates/.+',
            'samples/',
            'contest',
        },
    },
    'core.telegram.org': {
        'deny': {
            'bots/payments',
            'tdlib/docs/classtd',
            'validatedRequestedInfo',
            'constructor/Updates',
        },
    },
    'corefork.telegram.org': {
        'deny': {
            'bots/payments',
            'tdlib/docs/classtd',
            'validatedRequestedInfo',
            'constructor/Updates',
        },
    },
    'blogfork.telegram.org': {
        'deny': {
            'bots/payments',
            'tdlib/docs/classtd',
            'validatedRequestedInfo',
            'constructor/Updates',
        },
    },
    'telegram.org': {
        'deny': {
            r'apps$',
            r'img/emoji/.+',
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
OUTPUT_RESOURCES_FILENAME = os.environ.get('OUTPUT_RESOURCES_FILENAME', 'tracked_res_links.txt')
OUTPUT_TRANSLATIONS_FILENAME = os.environ.get('OUTPUT_TRANSLATIONS_FILENAME', 'tracked_tr_links.txt')

STEL_DEV_LAYER = 190

# unsecure but so simple
CONNECTOR = aiohttp.TCPConnector(ssl=False, force_close=True, limit=300)
TIMEOUT = aiohttp.ClientTimeout(total=10)
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

logging.basicConfig(format='%(message)s', level=logging.DEBUG)
logger = logging.getLogger(__name__)

VISITED_LINKS = set()
LINKS_TO_TRACK = set()
LINKS_TO_TRANSLATIONS = set()
LINKS_TO_TRACKABLE_RESOURCES = set()


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


def find_absolute_links(html: str) -> Set[str]:
    absolute_links = set(re.findall(ABSOLUTE_LINK_REGEX, html))

    return {link for link in absolute_links if not should_exclude(link)}


def find_relative_links(html: str, cur_link: str) -> Set[str]:
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


def find_relative_scripts(code: str, cur_link: str) -> Set[str]:
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


def cleanup_links(links: Set[str]) -> Set[str]:
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

        # fix wildcard
        if link.startswith('.'):
            link = link[1:]

        cleaned_links.add(link)

    return cleaned_links


def _is_x_content_type(content_types_set: Set[str], content_type) -> bool:
    for match_content_type in content_types_set:
        if match_content_type in content_type:
            return True

    return False


def is_translation_url(url: str) -> bool:
    return 'translations.telegram.org' in url


def is_textable_content_type(content_type: str) -> bool:
    textable_content_type = {
        'plain',
        'css',
        'json',
        'text',
        'javascript',
    }

    return _is_x_content_type(textable_content_type, content_type)


def is_trackable_content_type(content_type) -> bool:
    trackable_content_types = {
        'svg',
        'png',
        'jpeg',
        'x-icon',
        'gif',
        'mp4',
        'webm',
        'application/octet-stream',    # td updates
        'application/zip',
    }

    return _is_x_content_type(trackable_content_types, content_type)


class ServerSideError(Exception):
    pass


async def crawl(url: str, session: aiohttp.ClientSession):
    while True:
        try:
            await _crawl(url, session)
        except (ServerSideError, ServerDisconnectedError, TimeoutError, ClientConnectorError):
            logger.warning(f'Client or timeout error. Retrying {url}')

            if url in VISITED_LINKS:
                VISITED_LINKS.remove(url)
        else:
            break


async def _crawl(url: str, session: aiohttp.ClientSession):
    if url in VISITED_LINKS:
        return
    VISITED_LINKS.add(url)

    try:
        logger.info(f'[{len(VISITED_LINKS)}] Process {url}')
        async with session.get(f'{PROTOCOL}{url}', allow_redirects=False, timeout=TIMEOUT) as response:
            content_type = response.headers.get('content-type')

            if 499 < response.status < 600:
                VISITED_LINKS.remove(url)
                logger.warning(f'Error 5XX. Retrying {url}')
                raise ServerSideError()

            if response.status not in {200, 304}:
                if response.status != 302:
                    content = await response.text(encoding='UTF-8')
                    logger.debug(f'Skip {url} because status code == {response.status}. Content: {content}')
                return

            if is_textable_content_type(content_type):
                # raw content will be cached by aiohttp. Don't worry about it
                raw_content = await response.read()
                content = await response.text(encoding='UTF-8')

                if is_translation_url(url):
                    LINKS_TO_TRANSLATIONS.add(url)
                    logger.info(f'add {url} to LINKS_TO_TRANSLATIONS')
                else:
                    LINKS_TO_TRACK.add(url)
                    logger.info(f'add {url} to LINKS_TO_TRACK')

                absolute_links = cleanup_links(find_absolute_links(content))

                relative_links_finder = find_relative_links
                if 'javascript' in content_type:
                    relative_links_finder = find_relative_scripts

                relative_links = cleanup_links(relative_links_finder(content, url))

                sub_links = absolute_links | relative_links
                await asyncio.gather(*[crawl(url, session) for url in sub_links])
            elif is_trackable_content_type(content_type):
                LINKS_TO_TRACKABLE_RESOURCES.add(url)
                logger.info(f'add {url} to LINKS_TO_TRACKABLE_RESOURCES')
            else:
                # for example, zip with update of macOS client
                logger.info(f'Unhandled type: {content_type} from {url}')

            # telegram url can work with and without trailing slash (no redirect). P.S. not on every subdomain ;d
            # so this is a problem when we have random behavior with link will be added
            # this if resolve this issue. If available both link we prefer without trailing slash
            for links_set in (LINKS_TO_TRACK, LINKS_TO_TRANSLATIONS, LINKS_TO_TRACKABLE_RESOURCES):
                without_trailing_slash = url[:-1:] if url.endswith('/') else url
                if without_trailing_slash in links_set and f'{without_trailing_slash}/' in links_set:
                    links_set.remove(f'{without_trailing_slash}/')
                    logger.info(f'remove {without_trailing_slash}/')
    except UnicodeDecodeError:
        logger.warning(f'Codec can\'t decode bytes. So it was a tgs file or response with broken content type {url}')

        if raw_content.startswith(b'GIF'):
            LINKS_TO_TRACKABLE_RESOURCES.add(url)
            logger.info(f'add {url} to LINKS_TO_TRACKABLE_RESOURCES (raw content)')


async def start(url_list: Set[str]):
    async with aiohttp.ClientSession(connector=CONNECTOR, headers=HEADERS) as session:
        await asyncio.gather(*[crawl(url, session) for url in url_list])


if __name__ == '__main__':
    HIDDEN_URLS.add(BASE_URL)
    LINKS_TO_TRACK = LINKS_TO_TRACK | ADDITIONAL_URLS

    logger.info('Start crawling links...')
    start_time = time()
    asyncio.get_event_loop().run_until_complete(start(HIDDEN_URLS))
    logger.info(f'Stop crawling links. {time() - start_time} sec.')

    try:
        OLD_URL_LIST = set()
        for filename in (OUTPUT_FILENAME, OUTPUT_RESOURCES_FILENAME, OUTPUT_TRANSLATIONS_FILENAME):
            with open(filename, 'r') as f:
                OLD_URL_LIST |= set([l.replace('\n', '') for l in f.readlines()])

        CURRENT_URL_LIST = LINKS_TO_TRACK | LINKS_TO_TRACKABLE_RESOURCES | LINKS_TO_TRANSLATIONS

        logger.info(f'Is equal: {OLD_URL_LIST == CURRENT_URL_LIST}')
        logger.info(f'Deleted: {OLD_URL_LIST - CURRENT_URL_LIST}')
        logger.info(f'Added: {CURRENT_URL_LIST - OLD_URL_LIST}')
    except IOError:
        pass

    with open(OUTPUT_FILENAME, 'w') as f:
        f.write('\n'.join(sorted(LINKS_TO_TRACK)))

    with open(OUTPUT_RESOURCES_FILENAME, 'w') as f:
        f.write('\n'.join(sorted(LINKS_TO_TRACKABLE_RESOURCES)))

    with open(OUTPUT_TRANSLATIONS_FILENAME, 'w') as f:
        f.write('\n'.join(sorted(LINKS_TO_TRANSLATIONS)))
