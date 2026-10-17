# account.updateTheme

Update theme

```tl
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
---functions---
account.updateTheme#2bf40ccc flags:# format:string theme:InputTheme slug:flags.0?string title:flags.1?string document:flags.2?InputDocument settings:flags.3?Vector<InputThemeSettings> = Theme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **format** | [string](/type/string.md) | Theme format, a string that identifies the theming engines supported by the client |
| **theme** | [InputTheme](/type/InputTheme.md) | Theme to update |
| **slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Unique theme ID |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Theme name |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputDocument](/type/InputDocument.md) | Theme file |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[InputThemeSettings](/type/InputThemeSettings.md)&gt; | Theme settings |

### Result
[Theme](/type/Theme.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | THEME\_INVALID | Invalid theme provided. |