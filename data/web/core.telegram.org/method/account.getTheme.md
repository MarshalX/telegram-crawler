# account.getTheme

Get theme information

```tl
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
---functions---
account.getTheme#3a5869ec format:string theme:InputTheme = Theme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **format** | [string](/type/string.md) | Theme format, a string that identifies the theming engines supported by the client |
| **theme** | [InputTheme](/type/InputTheme.md) | Theme |

### Result
[Theme](/type/Theme.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | THEME\_FORMAT\_INVALID | Invalid theme format provided. |
| 400 | THEME\_INVALID | Invalid theme provided. |
| 400 | THEME\_SLUG\_INVALID | The specified theme slug is invalid. |