## Telegram Web Crawler

This project is developed to automatically detect changes made 
to the official Telegram sites. This is necessary for anticipating
future updates and other things (new vacancies, API updates).

**– [![Fetch new content of tracked links to files](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml/badge.svg?branch=data)](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_files_tree.yml) [Site updates tracker](https://github.com/MarshalX/telegram-crawler/commits/data)**

**– [![Generate or update list of tracked links](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml/badge.svg?branch=data)](https://github.com/MarshalX/telegram-crawler/actions/workflows/make_tracked_links_list.yml) [Site links tracker](https://github.com/MarshalX/telegram-crawler/commits/main/tracked_links.txt)**

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

### License

Licensed under the [MIT License](LICENSE).