# account.installTheme

Install a theme

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.installTheme#c727bb3b flags:# dark:flags.0?true theme:flags.1?InputTheme format:flags.2?string base_theme:flags.3?BaseTheme = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to install the dark version |
| **theme** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputTheme](/type/InputTheme.md) | Theme to install |
| **format** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Theme format, a string that identifies the theming engines supported by the client |
| **base\_theme** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[BaseTheme](/type/BaseTheme.md) | Indicates a basic theme provided by all clients |

### Result
[Bool](/type/Bool.md)

### Only users can use this method