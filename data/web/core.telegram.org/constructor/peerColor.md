# peerColor

Represents a [color palette »](/api/colors.md).

```tl
peerColor#b54b5acf flags:# color:flags.0?int background_emoji_id:flags.1?long = PeerColor;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **color** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Color palette ID, see here »](/api/colors.md) for more info; if not set, the default palette should be used. |
| **background\_emoji\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | Optional [custom emoji ID](/api/custom-emoji.md) used to generate the pattern. |

### Type
[PeerColor](/type/PeerColor.md)

### Related pages

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.