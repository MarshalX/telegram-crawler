# bots.PreviewInfo

Contains info about [Main Mini App previews, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.

```tl
bots.previewInfo#ca71d64 media:Vector<BotPreviewMedia> lang_codes:Vector<string> = bots.PreviewInfo;

---functions---

bots.getPreviewInfo#423ab3ad bot:InputUser lang_code:string = bots.PreviewInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.previewInfo](/constructor/bots.previewInfo.md) | Contains info about [Main Mini App previews, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [bots.getPreviewInfo](/method/bots.getPreviewInfo.md) | Bot owners only, fetch [main mini app preview information, see here »](/api/bots/webapps.md#main-mini-app-previews) for more info.\
\
Note: technically non-owners may also invoke this method, but it will always behave exactly as [bots.getPreviewMedias](/method/bots.getPreviewMedias.md), returning only previews for the current language and an empty `lang_codes` array, regardless of the passed `lang_code`, so please only use [bots.getPreviewMedias](/method/bots.getPreviewMedias.md) if you're not the owner of the `bot`. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.