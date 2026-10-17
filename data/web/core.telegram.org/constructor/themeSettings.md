# themeSettings

Theme settings

```tl
themeSettings#fa58b6d4 flags:# message_colors_animated:flags.2?true base_theme:BaseTheme accent_color:int outbox_accent_color:flags.3?int message_colors:flags.0?Vector<int> wallpaper:flags.1?WallPaper = ThemeSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **message\_colors\_animated** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the freeform gradient fill needs to be animated on every sent message. |
| **base\_theme** | [BaseTheme](/type/BaseTheme.md) | Base theme |
| **accent\_color** | [int](/type/int.md) | Accent color, ARGB format |
| **outbox\_accent\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Accent color of outgoing messages in ARGB format |
| **message\_colors** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | The fill to be used as a background for outgoing messages, in RGB24 format. \
If just one or two equal colors are provided, describes a solid fill of a background. \
If two different colors are provided, describes the top and bottom colors of a 0-degree gradient.\
If three or four colors are provided, describes a freeform gradient fill of a background. |
| **wallpaper** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[WallPaper](/type/WallPaper.md) | [Wallpaper](/api/wallpapers.md) |

### Type
[ThemeSettings](/type/ThemeSettings.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.