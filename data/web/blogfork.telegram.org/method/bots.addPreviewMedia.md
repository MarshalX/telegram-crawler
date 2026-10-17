# bots.addPreviewMedia

Add a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.

Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method.

```tl
botPreviewMedia#23e91ba3 date:int media:MessageMedia = BotPreviewMedia;
---functions---
bots.addPreviewMedia#17aeb75a bot:InputUser lang_code:string media:InputMedia = BotPreviewMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot that owns the Main Mini App. |
| **lang\_code** | [string](/type/string.md) | ISO 639-1 language code, indicating the localization of the preview to add. |
| **media** | [InputMedia](/type/InputMedia.md) | The photo/video preview, uploaded using [messages.uploadMedia](/method/messages.uploadMedia.md). |

### Result
[BotPreviewMedia](/type/BotPreviewMedia.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [messages.uploadMedia](/method/messages.uploadMedia.md)
Upload a file and associate it to a chat (without actually sending it to the chat)

May also be used in a [business connection](/api/bots/connected-business-bots.md), *not* by wrapping the query in [invokeWithBusinessConnection »](/method/invokeWithBusinessConnection.md), but rather by specifying the business connection ID in the `business_connection_id` parameter.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.