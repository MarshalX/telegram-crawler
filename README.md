## 🕷 Telegram Crawler

This project automatically detects changes made to the official Telegram sites,
beta clients, MTProto servers and even mini apps. It helps to anticipate
future updates and other news (new vacancies, API updates, etc.).

| Name                 | Commits  | Status                                                                                                                                                        |
|----------------------| -------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data tracker         | [Commits](https://github.com/MarshalX/telegram-crawler/commits/data)  | ![Fetch new content of tracked links and files](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml/badge.svg?branch=main)     |
| Site links collector | [Commits](https://github.com/MarshalX/telegram-crawler/commits/main/tracked_links.txt)  | ![Generate or update list of tracked links](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml/badge.svg?branch=main) |

* ✅ passing means the run went fine (with or without new changes)
* ❌ failing means a real error: a crawl failure, a timeout or a push conflict

To see new changes, look at the fresh commits in the data branch
and at the alert channels, not at the badge color.

Subscribe to the **[channel with alerts](https://t.me/tgcrawl)** to stay updated,
or to the **[forum version](https://t.me/tfcrawl)**, where every tracked area has its own topic.
Alerts are also mirrored to a Discord channel.
A copy of the Telegram websites and client resources is stored **[here](https://github.com/MarshalX/telegram-crawler/tree/data/data)**.

![GitHub pretty diff example](https://i.imgur.com/BK8UAju.png)

### What is tracked

| Target | How | Data folder | Alert hashtags |
|--------|-----|-------------|----------------|
| **Websites.** telegram.org and its subdomains (core, corefork, blogfork, td, desktop, osx, instantview, promote and more), contest.com, web app betas, plus TL schemas of TDLib and tdesktop straight from their GitHub repos | A recursive link crawler collects the pages, then the content crawler snapshots them with all dynamic parts removed | [`data/web`](https://github.com/MarshalX/telegram-crawler/tree/data/data/web) | `#web` |
| **Web resources.** CSS, JS, images, videos and other static files of the sites above | Text resources are stored as is, binary ones as SHA-256 hashes | [`data/web_res`](https://github.com/MarshalX/telegram-crawler/tree/data/data/web_res) | `#web_res` |
| **Translations.** All keys and values of translations.telegram.org for every client platform | Paginated AJAX collection of each category, plus an aggregated `translation_keys.json` | [`data/web_tr`](https://github.com/MarshalX/telegram-crawler/tree/data/data/web_tr) | `#web_tr` |
| **MTProto servers.** Production and test DCs | Real MTProto sessions (via Pyrogram) call `help.GetConfig`, `help.GetCdnConfig`, `help.GetCountriesList`, `help.GetAppConfig`, `messages.GetAvailableReactions` and `help.GetPremiumPromo`. They also fetch a set of official sticker packs. Volatile fields (access hashes, file references, dates) are scrubbed | [`data/server`](https://github.com/MarshalX/telegram-crawler/tree/data/data/server), [`data/server/test`](https://github.com/MarshalX/telegram-crawler/tree/data/data/server/test) | `#server`, `#test_server` |
| **Android client.** Public beta and stable APKs from telegram.org/dl | apktool decompiles resources only (`-s` flag), then `strings.xml` and `public.xml` are tracked | [`data/client/android-beta`](https://github.com/MarshalX/telegram-crawler/tree/data/data/client/android-beta), [`data/client/android-stable-dl`](https://github.com/MarshalX/telegram-crawler/tree/data/data/client/android-stable-dl) | `#android`, `#android_dl` |
| **macOS beta client.** | The Sparkle `versions.xml` feed points to the latest build. `Localizable.strings` is tracked as text, other resources as hashes, and `Assets.car` is unpacked with [acextract](https://github.com/MarshalX/acextract) | [`data/client/macos-beta`](https://github.com/MarshalX/telegram-crawler/tree/data/data/client/macos-beta) | `#macos` |
| **iOS beta client.** | A decrypted IPA from [decrypted-telegram-ios](https://github.com/MarshalX/decrypted-telegram-ios) is unpacked. Binary plists are decoded to JSON with `ccl_bplist`, other files are tracked as hashes, `Assets.car` goes through acextract as well | [`data/client/ios-beta`](https://github.com/MarshalX/telegram-crawler/tree/data/data/client/ios-beta) | `#ios` |
| **Wallet mini app.** walletbot.me | [unwebpack_sourcemap.py](unwebpack_sourcemap.py) restores the original `src` tree from webpack source maps | [`data/mini_app/wallet`](https://github.com/MarshalX/telegram-crawler/tree/data/data/mini_app/wallet) | `#mini_app`, `#wallet` |

### How it works

1. [Link crawling](make_tracked_links_list.py) runs **as often as possible**.
   It starts from the home page of telegram.org, detects relative and absolute
   sub links and recursively repeats the operation. There is also a set of
   `HIDDEN_URLS` to help the crawler find pages that nothing links to,
   and `ADDITIONAL_URLS` for external files like TL schemas.
   Exceptions are managed by a [system of rules](#example-of-link-crawler-rules-configuration).
   The result is three lists of unique links: [tracked_links.txt](tracked_links.txt)
   for pages, [tracked_res_links.txt](tracked_res_links.txt) for static resources
   and [tracked_tr_links.txt](tracked_tr_links.txt) for translations.
   A safety check aborts the run if a list suddenly shrinks too much,
   so a temporary Telegram outage cannot wipe the link base.

2. [Content crawling](make_files_tree.py) is launched **as often as possible**
   and uses the lists collected in step 1. It fetches every link and builds
   a tree of subfolders and files. All dynamic content is removed from files
   (page generation timestamps, API hashes, nonces, passport SSIDs, Sparkle
   signatures, APK tokens, TON rate and so on), so a git diff only ever shows
   real changes. Binary files are stored as SHA-256 hashes to keep the repo small.
   The same script also runs all the client, server and mini app trackers
   from the table above. The `MODE` environment variable selects what to run:
   `all`, `web`, `web_res`, `web_tr`, `server`, `client` or `mini_app`.

3. Everything runs on [GitHub Actions](.github/workflows/), so no servers
   are needed. You can simply fork this repository and run your own tracker.
   The content workflow is a matrix of six jobs, one per mode, with macOS
   runners where Apple tooling is needed. Each job commits its own folder
   to the **data** branch, so parallel jobs never conflict. When there is
   nothing new, the job simply has nothing to commit and finishes successfully.
   The link crawler also has a safety net: if the list of links suddenly
   shrinks too much, the run fails on purpose instead of committing a broken
   link base.

4. [Sending alerts](make_and_send_alert.py). A push to the data branch triggers
   an alert workflow (it lives on the data branch too). The script fetches
   the commit diff from the GitHub API, converts changed paths into hashtags
   and posts a summary to the [@tgcrawl](https://t.me/tgcrawl) channel,
   to the matching topics of the [@tfcrawl](https://t.me/tfcrawl) forum
   and to Discord.

### FAQ

**Q:** How often is "**as often as possible**"?

**A:** TL;DR: the content update action runs roughly every 10 minutes. More info:
- [Scheduled actions cannot be run more than once every 5 minutes.](https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/)
- [GitHub Actions workflow not triggering at scheduled time](https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/).

**Q:** Why are there two separate crawl scripts instead of one?

**A:** Because the original idea was to update the tracked links once an hour,
and separate scripts and workflows were more convenient for that.
After the Telegram 7.7 update, I realized that finding new blog posts
that slowly was a bad idea.

**Q:** Why does the alert script have a while loop?

**A:** Because the GitHub API doesn't return commit information immediately
after a push to the repository. The script waits for it to appear...

**Q:** Why are you using a GitHub Personal Access Token in the actions/checkout step?

**A:** So pushes made by the workflow can trigger other workflows. More info:
- [Action does not trigger another on push tag action ](https://github.community/t/action-does-not-trigger-another-on-push-tag-action/17148)

**Q:** Why are you using GitHub PAT in [make_and_send_alert.py](make_and_send_alert.py)?

**A:** To increase the GitHub API rate limits.

**Q:** Why are you decompiling the .apk file on each run?

**A:** Because it doesn't take much time. Only resources are decompiled
(the -s flag of apktool disables disassembly of dex files).
Writing a check that skips decompilation based on the hash of the apk file
would cost more time than it saves.

### Example of link crawler rules configuration

Every rule is a regex. Allow rules have higher priority than deny ones,
and an empty string matches any URL. For example, this keeps only the root,
the first level pages and the English categories of the translations platform:

```python
CRAWL_RULES = {
    'translations.telegram.org': {
        'allow': {
            r'^[^/]*$',  # root
            r'org/[^/]*/$',  # 1 lvl sub
            r'/en/[a-z_]+/$'  # 1 lvl after /en/
        },
        'deny': {
            '',  # all
        }
    },
}
```

The current configuration always lives in
[make_tracked_links_list.py](make_tracked_links_list.py):
see `CRAWL_RULES` for the rules and `HIDDEN_URLS` for the manually added links.

### License

Licensed under the [MIT License](LICENSE).
