# inputThemeSettings

Theme settings

```tl
inputThemeSettings#8fde504f flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?InputWallPaper wallpaper_settings:flags.1?WallPaperSettings = InputThemeSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **message\_colors\_animated** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the freeform gradient fill needs to be animated on every sent message |
| **base\_theme** | [BaseTheme](/type/BaseTheme.md) | Default theme on which this theme is based |
| **accent\_color** | [int](/type/int.md) | Accent color, ARGB format |
| **outbox\_accent\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Accent color of outgoing messages in ARGB format |
| **message\_colors** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | The fill to be used as a background for outgoing messages, in RGB24 format. \
If just one or two equal colors are provided, describes a solid fill of a background. \
If two different colors are provided, describes the top and bottom colors of a 0-degree gradient.\
If three or four colors are provided, describes a freeform gradient fill of a background. |
| **wallpaper** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputWallPaper](/type/InputWallPaper.md) | [inputWallPaper](/constructor/inputWallPaper.md) or [inputWallPaperSlug](/constructor/inputWallPaper.md) when passing wallpaper files for [image](/api/wallpapers.md#image-wallpapers) or [pattern](/api/wallpapers.md#pattern-wallpapers) wallpapers, [inputWallPaperNoFile](/constructor/inputWallPaperNoFile.md) with `id=0` otherwise. |
| **wallpaper\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[WallPaperSettings](/type/WallPaperSettings.md) | [Wallpaper](/api/wallpapers.md) settings. |

### Type
[InputThemeSettings](/type/InputThemeSettings.md)

### Related pages

#### [inputWallPaper](/constructor/inputWallPaper.md)
[Wallpaper](/api/wallpapers.md)

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [inputWallPaperNoFile](/constructor/inputWallPaperNoFile.md)
[Wallpaper](/api/wallpapers.md) with no file access hash, used for example when deleting (`unsave=true`) wallpapers using [account.saveWallPaper](/method/account.saveWallPaper.md), specifying just the wallpaper ID.