# theme

Theme

```tl
theme#a00e67d6 flags:# creator:flags.0?true default:flags.1?true for_chat:flags.5?true id:long access_hash:long slug:string title:string document:flags.2?Document settings:flags.3?Vector<ThemeSettings> emoticon:flags.6?string installs_count:flags.4?int = Theme;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the current user is the creator of this theme |
| **default** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is the default theme |
| **for\_chat** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this theme is meant to be used as a [chat theme](https://telegram.org/blog/chat-themes-interactive-emoji-read-receipts) |
| **id** | [long](/type/long.md) | Theme ID |
| **access\_hash** | [long](/type/long.md) | Theme access hash |
| **slug** | [string](/type/string.md) | Unique theme ID |
| **title** | [string](/type/string.md) | Theme name |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Document](/type/Document.md) | Theme |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[ThemeSettings](/type/ThemeSettings.md)&gt; | Theme settings |
| **emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | Theme emoji |
| **installs\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Installation count |

### Type
[Theme](/type/Theme.md)