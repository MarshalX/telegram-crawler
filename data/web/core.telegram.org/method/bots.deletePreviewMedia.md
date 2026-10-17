# bots.deletePreviewMedia

Delete a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.

Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.deletePreviewMedia#2d0135b3 bot:InputUser lang_code:string media:Vector<InputMedia> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot that owns the Main Mini App. |
| **lang\_code** | [string](/type/string.md) | ISO 639-1 language code, indicating the localization of the preview to delete. |
| **media** | [Vector](/type/Vector%20t)&lt;[InputMedia](/type/InputMedia.md)&gt; | The photo/video preview to delete, previously fetched as specified [here »](/api/bots/webapps.md#main-mini-app-previews). |

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