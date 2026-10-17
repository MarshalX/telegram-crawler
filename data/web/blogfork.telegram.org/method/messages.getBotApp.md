# messages.getBotApp

Obtain information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps)

```tl
messages.botApp#eb50adf5 flags:# inactive:flags.0?true request_write_access:flags.1?true has_settings:flags.2?true app:BotApp = messages.BotApp;
---functions---
messages.getBotApp#34fdc5c3 app:InputBotApp hash:long = messages.BotApp;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **app** | [InputBotApp](/type/InputBotApp.md) | Bot app information obtained from a [Direct Mini App deep link »](/api/links.md#direct-mini-app-links). |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[messages.BotApp](/type/messages.BotApp.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_APP\_BOT\_INVALID | The bot_id passed in the inputBotAppShortName constructor is invalid. |
| 400 | BOT\_APP\_INVALID | The specified bot app is invalid. |
| 400 | BOT\_APP\_SHORTNAME\_INVALID | The specified bot app short name is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.