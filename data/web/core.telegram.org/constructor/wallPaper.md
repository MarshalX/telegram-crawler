# wallPaper

Represents a [wallpaper](/api/wallpapers.md) based on an image.

```tl
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Identifier |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we created this wallpaper |
| **default** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is the default wallpaper |
| **pattern** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a [pattern wallpaper »](/api/wallpapers.md#pattern-wallpapers) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this wallpaper should be used in dark mode. |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **slug** | [string](/type/string.md) | Unique wallpaper ID, used when generating [wallpaper links](/api/links.md#wallpaper-links) or [importing wallpaper links](/api/wallpapers.md). |
| **document** | [Document](/type/Document.md) | The actual wallpaper |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WallPaperSettings](/type/WallPaperSettings.md) | Info on how to generate the wallpaper, according to [these instructions »](/api/wallpapers.md). |

### Type
[WallPaper](/type/WallPaper.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.