## 🕷 Telegram Web Crawler

This project is developed to automatically detect changes made 
to the official Telegram sites. This is necessary for anticipating
future updates and other things (new vacancies, API updates, etc).


| Name | Commits  | Status |
| -----| -------- | ------ |
| Site updates tracker| [Commits](https://github.com/MarshalX/telegram-crawler/commits/data)  | ![Fetch new content of tracked links to files](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml/badge.svg?branch=main)  |
| Site links tracker | [Commits](https://github.com/MarshalX/telegram-crawler/commits/main/tracked_links.txt)  | ![Generate or update list of tracked links](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml/badge.svg?branch=main)  |

* ✅ passing – new changes
* ❌ failing – no changes

You should to subscribe to **[channel with alerts](https://t.me/tgcrawl)** 
to stay updated or watch (enable notifications) this repository with "All Activity" setting.
Copy of Telegram websites stored **[here](https://github.com/MarshalX/telegram-crawler/tree/data/data)**.

![GitHub pretty diff](https://i.imgur.com/BK8UAju.png)

### How it works

1. [Link crawling](make_tracked_links_list.py) runs once an hour. 
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
   and files. Removes all dynamic content from files.
   
3. Using of [GitHub Actions](.github/workflows/). Works without own servers.
   You can just fork this repository and own tracker system by yourself.
   Workflows launch scripts and commit changes. All file changes are tracked 
   by the GIT and beautifully displayed on the GitHub. GitHub Actions 
   should be built correctly only if there are changes on the Telegram website. 
   Otherwise, the workflow should fail. If build was successful, we can 
   send notifications to Telegram channel and so on.
   
### FAQ

**Q:** How many is "**as often as possible**"?

**A:** TLTR: content update action runs every ~10 minutes. More info:
- [Scheduled actions cannot be run more than once every 5 minutes.](https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/)
- [GitHub Actions workflow not triggering at scheduled time](https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/).
  
### TODO list

- add storing history of content using hashes;
- add storing hashes of image, svg, video.

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