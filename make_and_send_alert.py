import asyncio
import logging
import os

import aiohttp

COMMIT_SHA = os.environ['COMMIT_SHA']

TELEGRAM_BOT_TOKEN = os.environ['TELEGRAM_BOT_TOKEN']
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
}


async def main():
    async with aiohttp.ClientSession() as session:
        changes = []

        url = f'{BASE_GITHUB_API}{GITHUB_LAST_COMMITS}'.format(repo=REPOSITORY, sha=COMMIT_SHA)
        async with session.get(url) as response:
            json = await response.json()

            html_url = json['html_url']
            files = json.get('files', [])
            for file in files:
                filename = file['filename'].replace(f'{ROOT_TREE_DIR}/', '').replace('.html', '')
                status = STATUS_TO_EMOJI[file['status']]

                changes.append(f'{status} <code>{filename}</code>')

        alert_text = [
            '<b>New changes on Telegram sites</b>\n',
            '\n'.join(changes) + '\n',
            f'<a href="{html_url}">View diff on GitHub...</a>'
        ]

        url = f'{BASE_TELEGRAM_API}{TELEGRAM_SEND_MESSAGE}'.format(token=TELEGRAM_BOT_TOKEN)
        params = {
            'chat_id': CHAT_ID,
            'parse_mode': 'HTML',
            'text': '\n'.join(alert_text),
        }

        async with await session.get(url, params=params) as response:
            if response.status != 200:
                params['text'] = f'<b>❗️ Too many new changes on Telegram sites</b>\n\n' \
                                 f'<a href="{html_url}">View diff on GitHub...</a>'
                await session.get(url, params=params)


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())
