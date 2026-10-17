# bots.checkDownloadFileParams

Check if a [mini app](/api/bots/webapps.md) can request the download of a specific file: called when handling [web\_app\_request\_file\_download events »](/api/web-events.md#web-app-request-file-download)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.checkDownloadFileParams#50077589 bot:InputUser file_name:string url:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot that owns the [mini app](/api/bots/webapps.md) that requested the download |
| **file\_name** | [string](/type/string.md) | The `filename` from the [web\_app\_request\_file\_download event »](/api/web-events.md#web-app-request-file-download) |
| **url** | [string](/type/string.md) | The `url` from the [web\_app\_request\_file\_download event »](/api/web-events.md#web-app-request-file-download) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages