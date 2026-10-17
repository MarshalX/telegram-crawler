# bots.getPreviewMedias

Fetch [main mini app previews, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.

```tl
---functions---
bots.getPreviewMedias#a2a5594d bot:InputUser = Vector<BotPreviewMedia>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot that owns the Main Mini App. |

### Result
[Vector](/type/Vector%20t)&lt;[BotPreviewMedia](/type/BotPreviewMedia.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.