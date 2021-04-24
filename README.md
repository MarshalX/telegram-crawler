## Telegram Web Crawler

This project is developed to automatically detect changes made 
to the official Telegram sites. This is necessary for anticipating
future updates and other things (new vacancies, API updates, etc).


| Name | Commits  | Status |
| -----| -------- | ------ |
| Site updates tracker| [Commits](https://github.com/MarshalX/telegram-crawler/commits/data)  | ![Fetch new content of tracked links to files](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml/badge.svg?branch=main)  |
| Site links tracker | [Commits](https://github.com/MarshalX/telegram-crawler/commits/main/tracked_links.txt)  | ![Generate or update list of tracked links](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml/badge.svg?branch=main)  |

* passing – new changes
* failing – no changes

Copy of Telegram websites stored **[here](https://github.com/MarshalX/telegram-crawler/tree/data/data)**.

![GitHub pretty diff](https://i.imgur.com/BK8UAju.png)

### How it should work in dreams

1. [Link crawling](make_tracked_links_list.py) runs once an hour. 
   Starts crawling from the home page of the site. 
   Detects relative and absolute sub links and recursively repeats the operation. 
   Writes a list of unique links for future content comparison. 
   Additionally, there is the ability to add links by hand to help the script 
   find more hidden (links to which no one refers) links.

2. [Content crawling](make_files_tree.py) is launched as often as 
   possible and uses the existing list of links collected in step 1. 
   Going through the base it gets contains and builds a system of subfolders 
   and files. Removes all dynamic content from files.
   
3. Works without own servers. Used [GitHub Actions](.github/workflows/).
   All file changes are tracked by the GIT and are beautifully 
   displayed on the GitHub. Github Actions should be built 
   correctly only if there are changes on the Telegram website. 
   Otherwise, the workflow should fail. 
   If build was successful, we can send notifications to 
   Telegram channel and so on.
   
### The real world

- [Scheduled actions cannot be run more than once every 5 minutes.](https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/)
    - [GitHub Actions workflow not triggering at scheduled time](https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/). TLTR: actions run every ~10 minutes.
- GitHub Actions freeze for 5 minutes when updating the list of links. 
  Locally, this takes less than 10 seconds for several hundred requests.
  **This is not really a big problem. The list of links is rarely updated.**
- When updating links, ~one link may be lost, and the next list generation 
  it is returned. This will lead to the successful execution of workflow
  when there were no server changes. Most likely this is a 
  bug in my script that can be fixed. As a last resort, compare 
  the old version of the linkbase with the new one.
  
### TODO list

- bug fixes;
- alert system.

### Example of link crawler rules configuration

```python
CRAWL_RULES = {
    # every rule is regex
    # empty string means match any url
    # allow rules with high priority than deny
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