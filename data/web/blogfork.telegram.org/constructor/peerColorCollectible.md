# peerColorCollectible

Represents a [color palette »](/api/colors.md) associated to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/colors.md#collectible-gift-palettes) for more info.

```tl
peerColorCollectible#b9c0639a flags:# collectible_id:long gift_emoji_id:long background_emoji_id:long accent_color:int colors:Vector<int> dark_accent_color:flags.0?int dark_colors:flags.1?Vector<int> = PeerColor;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **collectible\_id** | [long](/type/long.md) | ID of the [collectible gift »](/api/gifts.md#collectible-gifts). |
| **gift\_emoji\_id** | [long](/type/long.md) | [Custom emoji ID »](/api/custom-emoji.md) of the collectible gift: a single copy of this custom emoji should be displayed as-is (without recoloring it, unlike for `background_emoji_id`) in the top-right corner of the palette. |
| **background\_emoji\_id** | [long](/type/long.md) | [Custom emoji ID »](/api/custom-emoji.md) used to generate the pattern. |
| **accent\_color** | [int](/type/int.md) | Accent color in RGB24 format, used for reply backgrounds and the user's name in messages. |
| **colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 1-3 RGB24 colors to be used in the reply strip. |
| **dark\_accent\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Accent color in RGB24 format, used for reply backgrounds and the user's name in messages in dark mode (fallback to `accent_color` if absent). |
| **dark\_colors** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 1-3 RGB24 colors to be used in the reply strip in dark mode (fallback to `colors` if absent). |

### Type
[PeerColor](/type/PeerColor.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!