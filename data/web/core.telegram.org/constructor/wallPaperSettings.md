# wallPaperSettings

[Wallpaper](/api/wallpapers.md) rendering information.

```tl
wallPaperSettings#372efcd0 flags:# blur:flags.1?true motion:flags.2?true background_color:flags.0?int second_background_color:flags.4?int third_background_color:flags.5?int fourth_background_color:flags.6?int intensity:flags.3?int rotation:flags.4?int emoticon:flags.7?string = WallPaperSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blur** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | For [image wallpapers »](/api/wallpapers.md#image-wallpapers): if set, the JPEG must be downscaled to fit in 450x450 square and then box-blurred with radius 12. |
| **motion** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the background needs to be slightly moved when the device is rotated. |
| **background\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Used for [solid »](/api/wallpapers.md#solid-fill), [gradient »](/api/wallpapers.md#gradient-fill) and [freeform gradient »](/api/wallpapers.md#freeform-gradient-fill) fills. |
| **second\_background\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Used for [gradient »](/api/wallpapers.md#gradient-fill) and [freeform gradient »](/api/wallpapers.md#freeform-gradient-fill) fills. |
| **third\_background\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Used for [freeform gradient »](/api/wallpapers.md#freeform-gradient-fill) fills. |
| **fourth\_background\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[int](/type/int.md) | Used for [freeform gradient »](/api/wallpapers.md#freeform-gradient-fill) fills. |
| **intensity** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Used for [pattern wallpapers »](/api/wallpapers.md#pattern-wallpapers). |
| **rotation** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Clockwise rotation angle of the gradient, in degrees; 0-359. Should be always divisible by 45. |
| **emoticon** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[string](/type/string.md) | If set, this wallpaper can be used as a channel wallpaper and is represented by the specified UTF-8 emoji. |

### Type
[WallPaperSettings](/type/WallPaperSettings.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.