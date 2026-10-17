# wallPaperNoFile

Represents a [wallpaper](/api/wallpapers.md) only based on colors/gradients.

```tl
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Wallpaper ID |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **default** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is the default wallpaper |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this wallpaper should be used in dark mode. |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WallPaperSettings](/type/WallPaperSettings.md) | Info on how to generate the wallpaper. |

### Type
[WallPaper](/type/WallPaper.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.