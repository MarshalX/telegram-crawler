import asyncio
import logging
import os
import re
from typing import Tuple

import aiohttp

COMMIT_SHA = os.environ['COMMIT_SHA']

# commits for test alert builder
# COMMIT_SHA = '4015bd9c48b45910727569fff5e770000d85d207' # all clients + server and test server + web
# COMMIT_SHA = '9cc3f0fb7c390c8cb8b789e9377f10ed5e80a089' # web and web res together
# COMMIT_SHA = '4efaf918af43054ba3ff76068e83d135a9a2535d' # web
# COMMIT_SHA = 'e2d725c2b3813d7c170f50b0ab21424a71466f6d' # web res

TELEGRAM_BOT_TOKEN = os.environ['TELEGRAM_BOT_TOKEN']
GITHUB_PAT = os.environ['GITHUB_PAT']

REPOSITORY = os.environ.get('REPOSITORY', 'MarshalX/telegram-crawler')
CHAT_ID = os.environ.get('CHAT_ID', '@tgcrawl')
ROOT_TREE_DIR = os.environ.get('ROOT_TREE_DIR', 'data')

BASE_GITHUB_API = 'https://api.github.com/'
GITHUB_LAST_COMMITS = 'repos/{repo}/commits/{sha}'

BASE_TELEGRAM_API = 'https://api.telegram.org/bot{token}/'
TELEGRAM_SEND_MESSAGE = 'sendMessage'

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

STATUS_TO_EMOJI = {
    'added': '✅',
    'modified': '📝',
    'removed': '❌',
    'renamed': '🔄',
    'copied': '📋',
    'changed': '📝',
    'unchanged': '📝',
}

AVAILABLE_HASHTAGS = {
    'web_tr', 'web_res', 'web', 'server', 'test_server', 'client', 'ios', 'macos', 'android'
}
HASHTAGS_PATTERNS = {
    # regex will be more flexible. for example, in issue with double hashtag '#web #web_res' when data/res not changed
    'web_tr': os.path.join(ROOT_TREE_DIR, 'web_tr'),
    'web_res': os.path.join(ROOT_TREE_DIR, 'web_res'),
    'web': os.path.join(ROOT_TREE_DIR, 'web'),
    'server': os.path.join(ROOT_TREE_DIR, 'server'),
    'test_server': os.path.join(ROOT_TREE_DIR, 'server', 'test'),
    'client': os.path.join(ROOT_TREE_DIR, 'client'),
    'ios': os.path.join(ROOT_TREE_DIR, 'client', 'ios-beta'),
    'macos': os.path.join(ROOT_TREE_DIR, 'client', 'macos-beta'),
    'android': os.path.join(ROOT_TREE_DIR, 'client', 'android-beta'),
}
# order is important!
PATHS_TO_REMOVE_FROM_ALERT = [
    os.path.join(ROOT_TREE_DIR, 'web_tr'),
    os.path.join(ROOT_TREE_DIR, 'web_res'),
    os.path.join(ROOT_TREE_DIR, 'web'),
    os.path.join(ROOT_TREE_DIR, 'server'),
    os.path.join(ROOT_TREE_DIR, 'client'),
]

GITHUB_API_LIMIT_PER_HOUR = 5_000
COUNT_OF_RUNNING_WORKFLOW_AT_SAME_TIME = 5  # just random number ;d

ROW_PER_STATUS = 5

LAST_PAGE_NUMBER_REGEX = r'page=(\d+)>; rel="last"'


async def send_req_until_success(session: aiohttp.ClientSession, **kwargs) -> Tuple[dict, int]:
    delay = 5  # in sec
    count_of_retries = int(GITHUB_API_LIMIT_PER_HOUR / COUNT_OF_RUNNING_WORKFLOW_AT_SAME_TIME / delay)

    last_page_number = 1
    retry_number = 1
    while retry_number <= count_of_retries:
        retry_number += 1

        res = await session.get(**kwargs)
        if res.status != 200:
            await asyncio.sleep(delay)
            continue

        json = await res.json()

        pagination_data = res.headers.get('Link', '')
        matches = re.findall(LAST_PAGE_NUMBER_REGEX, pagination_data)
        if matches:
            last_page_number = int(matches[0])

        return json, last_page_number

    raise RuntimeError('Surprise. Time is over')


async def main() -> None:
    async with aiohttp.ClientSession() as session:
        commit_data, last_page = await send_req_until_success(
            session=session,
            url=f'{BASE_GITHUB_API}{GITHUB_LAST_COMMITS}'.format(repo=REPOSITORY, sha=COMMIT_SHA),
            headers={
                'Authorization': f'token {GITHUB_PAT}'
            }
        )
        commit_files = commit_data['files']

        coroutine_list = list()
        for current_page in range(2, last_page + 1):
            coroutine_list.append(send_req_until_success(
                session=session,
                url=f'{BASE_GITHUB_API}{GITHUB_LAST_COMMITS}?page={current_page}'.format(
                    repo=REPOSITORY, sha=COMMIT_SHA
                ),
                headers={
                    'Authorization': f'token {GITHUB_PAT}'
                }
            ))

        paginated_responses = await asyncio.gather(*coroutine_list)
        for json_response, _ in paginated_responses:
            commit_files.extend(json_response['files'])

        html_url = commit_data['html_url']

        alert_text = f'<b>New changes of Telegram</b>\n\n'
        alert_hashtags = set()

        global AVAILABLE_HASHTAGS
        available_hashtags = AVAILABLE_HASHTAGS.copy()

        changes = {k: [] for k in STATUS_TO_EMOJI.keys()}
        for file in commit_files:
            for available_hashtag in available_hashtags:
                pattern = HASHTAGS_PATTERNS[available_hashtag]
                if pattern in file['filename']:
                    alert_hashtags.add(available_hashtag)

            # optimize substring search
            available_hashtags -= alert_hashtags

            changed_url = file['filename'].replace('.html', '')
            for path_to_remove in PATHS_TO_REMOVE_FROM_ALERT:
                if changed_url.startswith(path_to_remove):
                    changed_url = changed_url[len(path_to_remove) + 1:]
                    break   # can't occur more than one time

            status = STATUS_TO_EMOJI[file['status']]
            changes[file['status']].append(f'{status} <code>{changed_url}</code>')

        for i, [status, text_list] in enumerate(changes.items()):
            if not text_list:
                continue

            alert_text += '\n'.join(text_list[:ROW_PER_STATUS]) + '\n'

            if len(text_list) > ROW_PER_STATUS:
                count = len(text_list) - ROW_PER_STATUS
                alert_text += f'And <b>{count}</b> {status} actions more..\n'

            alert_text += '\n'

        alert_text += f'<a href="{html_url}">View diff on GitHub...</a>'
        if alert_hashtags:
            alert_text += '\n\n' + ' '.join([f'#{hashtag}' for hashtag in sorted(alert_hashtags)])

        logger.info(alert_text)
        telegram_response = await session.get(
            url=f'{BASE_TELEGRAM_API}{TELEGRAM_SEND_MESSAGE}'.format(token=TELEGRAM_BOT_TOKEN),
            params={
                'chat_id': CHAT_ID,
                'parse_mode': 'HTML',
                'text': alert_text,
            }
        )
        logger.debug(await telegram_response.read())


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
