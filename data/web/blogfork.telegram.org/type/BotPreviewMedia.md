# BotPreviewMedia

Represents a [Main Mini App preview media, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.

```tl
botPreviewMedia#23e91ba3 date:int media:MessageMedia = BotPreviewMedia;

---functions---

bots.addPreviewMedia#17aeb75a bot:InputUser lang_code:string media:InputMedia = BotPreviewMedia;
bots.editPreviewMedia#8525606f bot:InputUser lang_code:string media:InputMedia new_media:InputMedia = BotPreviewMedia;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [botPreviewMedia](/constructor/botPreviewMedia.md) | Represents a [Main Mini App preview media, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [bots.addPreviewMedia](/method/bots.addPreviewMedia.md) | Add a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |
| [bots.editPreviewMedia](/method/bots.editPreviewMedia.md) | Edit a [main mini app preview, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Only owners of bots with a configured Main Mini App can use this method, see [see here »](/api/bots/webapps.md#main-mini-app-previews) for more info on how to check if you can invoke this method. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.