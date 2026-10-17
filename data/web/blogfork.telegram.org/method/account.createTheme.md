# account.createTheme

Create a theme

```tl
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
---functions---
account.createTheme#652e4400 flags:# slug:string title:string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **slug** | [string](/type/string.md) | Unique theme ID used to generate [theme deep links](/api/links.md#theme-links), can be empty to autogenerate a random ID. |
| **title** | [string](/type/string.md) | Theme name |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputDocument](/type/InputDocument.md) | Theme file |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[InputThemeSettings](/type/InputThemeSettings.md)&gt; | Theme settings, multiple values can be provided for the different base themes (day/night mode, etc). |

### Result
[Theme](/type/Theme.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | THEME\_MIME\_INVALID | The theme's MIME type is invalid. |
| 400 | THEME\_TITLE\_INVALID | The specified theme title is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.