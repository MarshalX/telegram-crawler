import asyncio
import logging
import os

import aiohttp

COMMIT_SHA = os.environ['COMMIT_SHA']

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

STATUS_TO_EMOJI = {
    'added': '✅',
    'modified': '📝',
    'removed': '❌',
    'renamed': '🔄',
    'copied': '📋',
    'changed': '📝',
    'unchanged': '📝',
}

GITHUB_API_LIMIT_PER_HOUR = 5_000
COUNT_OF_RUNNING_WORKFLOW_AT_SAME_TIME = 5  # just random number ;d

ROW_PER_STATUS = 5


async def send_req_until_success(session, **kwargs):
    delay = 5  # in sec
    count_of_retries = int(GITHUB_API_LIMIT_PER_HOUR / COUNT_OF_RUNNING_WORKFLOW_AT_SAME_TIME / delay)

    retry_number = 1
    while retry_number <= count_of_retries:
        retry_number += 1

        res = await session.get(**kwargs)
        if res.status != 200:
            await asyncio.sleep(delay)
            continue

        json = await res.json()

        # TODO rewrite всратое говно написанное за 1 насосеку
        last_page = 0
        import re
        kurwa_regex = r'page=(\d+)>; rel="last"'
        if 'Link' in res.headers:
            link = res.headers['Link']
            try:
                last_page = int(re.findall(kurwa_regex, link)[0])
            except:
                ...

        return json, last_page

    raise RuntimeError('Surprise. Time is over')


async def main():
    async with aiohttp.ClientSession() as session:
        json, last_page = await send_req_until_success(
            session=session,
            url=f'{BASE_GITHUB_API}{GITHUB_LAST_COMMITS}'.format(repo=REPOSITORY, sha=COMMIT_SHA),
            headers={
                'Authorization': f'token {GITHUB_PAT}'
            }
        )
        files = json['files']

        # рофлянус в анус
        if last_page != 0:
            for page in range(2, last_page + 1):
                print(f'Page {page}')
                json2, _ = await send_req_until_success(
                    session=session,
                    url=f'{BASE_GITHUB_API}{GITHUB_LAST_COMMITS}?page={page}'.format(repo=REPOSITORY, sha=COMMIT_SHA),
                    headers={
                        'Authorization': f'token {GITHUB_PAT}'
                    }
                )
                files.extend(json2['files'])

        html_url = json['html_url']

        changes = {k: [] for k in STATUS_TO_EMOJI.keys()}
        for file in files:
            changed_url = file['filename'].replace(f'{ROOT_TREE_DIR}/', '').replace('.html', '')
            status = STATUS_TO_EMOJI[file['status']]

            changes[file['status']].append(f'{status} <code>{changed_url}</code>')

        alert_text = f'<b>New changes of Telegram</b>\n\n'

        for i, [status, text_list] in enumerate(changes.items()):
            if not text_list:
                continue

            alert_text += '\n'.join(text_list[:ROW_PER_STATUS]) + '\n'

            if len(text_list) > ROW_PER_STATUS:
                count = len(text_list) - ROW_PER_STATUS
                alert_text += f'And <b>{count}</b> {status} actions more..\n'

            alert_text += '\n'

        alert_text += f'<a href="{html_url}">View diff on GitHub...</a>'

        await session.get(
            url=f'{BASE_TELEGRAM_API}{TELEGRAM_SEND_MESSAGE}'.format(token=TELEGRAM_BOT_TOKEN),
            params={
                'chat_id': CHAT_ID,
                'parse_mode': 'HTML',
                'text': alert_text,
            }
        )


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
