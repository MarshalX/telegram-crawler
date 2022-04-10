## 🕷 Telegram Crawler

This project is developed to automatically detect changes made 
to the official Telegram sites and beta clients. This is necessary for 
anticipating future updates and other things 
(new vacancies, API updates, etc).

| Name                 | Commits  | Status                                                                                                                                                        |
|----------------------| -------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data tracker         | [Commits](https://github.com/MarshalX/telegram-crawler/commits/data)  | ![Fetch new content of tracked links and files](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml/badge.svg?branch=main)     |
| Site links collector | [Commits](https://github.com/MarshalX/telegram-crawler/commits/main/tracked_links.txt)  | ![Generate or update list of tracked links](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml/badge.svg?branch=main) |

* ✅ passing – new changes
* ❌ failing – no changes

You should to subscribe to **[channel with alerts](https://t.me/tgcrawl)** to stay updated.
Copy of Telegram websites and client`s resources stored **[here](https://github.com/MarshalX/telegram-crawler/tree/data/data)**.

![GitHub pretty diff example](https://i.imgur.com/BK8UAju.png)

### How it works

1. [Link crawling](make_tracked_links_list.py) runs **as often as possible**. 
   Starts crawling from the home page of the site. 
   Detects relative and absolute sub links and recursively repeats the operation. 
   Writes a list of unique links for future content comparison. 
   Additionally, there is the ability to add links by hand to help the script 
   find more hidden (links to which no one refers) links. To manage exceptions,
   there is a [system of rules](#example-of-link-crawler-rules-configuration)
   for the link crawler.

2. [Content crawling](make_files_tree.py) is launched **as often as 
   possible** and uses the existing list of links collected in step 1. 
   Going through the base it gets contains and builds a system of subfolders 
   and files. Removes all dynamic content from files. It downloads beta version 
   of Android Client, decompiles it and track resources also. Tracking of 
   resources of Telegram for macOS presented too.

3. Using of [GitHub Actions](.github/workflows/). Works without own servers.
   You can just fork this repository and own tracker system by yourself.
   Workflows launch scripts and commit changes. All file changes are tracked 
   by GIT and beautifully displayed on GitHub. GitHub Actions should be built
   correctly only if there are changes on the Telegram website. Otherwise, the 
   workflow should fail. If build was successful, we can send notifications to 
   Telegram channel and so on.

### FAQ

**Q:** How often is "**as often as possible**"?

**A:** TLTR: content update action runs every ~10 minutes. More info:
- [Scheduled actions cannot be run more than once every 5 minutes.](https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/)
- [GitHub Actions workflow not triggering at scheduled time](https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/).

**Q:** Why there is 2 separated crawl scripts instead of one?

**A:** Because the previous idea was to update tracked links once at hour.
It was so comfortably to use separated scripts and workflows.
After Telegram 7.7 update, I realised that find new blog posts so slowly is bad idea.

**Q:** Why alert for sending alerts have while loop?

**A:** Because GitHub API doesn't return information about commit immediately 
after push to repository. Therefore, script are waiting for information to appear...

**Q:** Why are you using GitHab Personal Access Token in action/checkout workflow`s step?

**A:** To have ability to trigger other workflows by on push trigger. More info:
- [Action does not trigger another on push tag action ](https://github.community/t/action-does-not-trigger-another-on-push-tag-action/17148)

**Q:** Why are you using GitHab PAT in [make_and_send_alert.py](make_and_send_alert.py)?

**A:** To increase limits of GitHub API.

**Q:** Why are you decompiling .apk file each run?

**A:** Because it doesn't require much time. I am decompiling only 
resources (-s flag of apktool to disable disassembly of dex files). 
Writing a check for the need for decompilation by the hash of the apk file 
would take more time.

### Example of link crawler rules configuration

```python
CRAWL_RULES = {
    # every rule is regex
    # empty string means match any url
    # allow rules with higher priority than deny
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
    'bugs.telegram.org': {
        'deny': {
            '',    # deny all sub domain
        },
    },
}
```

### Current hidden urls list

```python
HIDDEN_URLS = {
    # 'corefork.telegram.org', # disabled

    'telegram.org/privacy/gmailbot',
    'telegram.org/tos',
    'telegram.org/tour',
    'telegram.org/evolution',

    'desktop.telegram.org/changelog',
}
```

### License

Licensed under the [MIT License](LICENSE).
