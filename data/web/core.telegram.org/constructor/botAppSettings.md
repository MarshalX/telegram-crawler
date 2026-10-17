# botAppSettings

[Mini app »](/api/bots/webapps.md) settings

```tl
botAppSettings#c99b1950 flags:# placeholder_path:flags.0?bytes background_color:flags.1?int background_dark_color:flags.2?int header_color:flags.3?int header_dark_color:flags.4?int = BotAppSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **placeholder\_path** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | SVG placeholder logo, compressed using the same format used for [vector thumbnails »](/api/files.md#vector-thumbnails). |
| **background\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Default light mode background color |
| **background\_dark\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Default dark mode background color |
| **header\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Default light mode header color |
| **header\_dark\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Default dark mode header color |

### Type
[BotAppSettings](/type/BotAppSettings.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.