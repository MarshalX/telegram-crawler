# help.getRecentMeUrls

Get recently used `t.me` links.

When installing official applications from "Download Telegram" buttons present in [t.me](https://t.me) pages, a referral parameter is passed to applications after installation.  
If, after downloading the application, the user creates a new account (instead of logging into an existing one), the referral parameter should be imported using this method, which returns the [t.me](https://t.me) pages the user recently opened, before installing Telegram.

```tl
help.recentMeUrls#e0310d7 urls:Vector<RecentMeUrl> chats:Vector<Chat> users:Vector<User> = help.RecentMeUrls;
---functions---
help.getRecentMeUrls#3dc0f114 referer:string = help.RecentMeUrls;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **referer** | [string](/type/string.md) | Referrer |

### Result
[help.RecentMeUrls](/type/help.RecentMeUrls.md)

### Only users can use this method