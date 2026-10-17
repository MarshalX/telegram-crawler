# PeerColor

Represents a [color palette »](/api/colors.md).

```tl
peerColor#b54b5acf flags:# color:flags.0?int background_emoji_id:flags.1?long = PeerColor;
peerColorCollectible#b9c0639a flags:# collectible_id:long gift_emoji_id:long background_emoji_id:long accent_color:int colors:Vector<int> dark_accent_color:flags.0?int dark_colors:flags.1?Vector<int> = PeerColor;
inputPeerColorCollectible#b8ea86a9 collectible_id:long = PeerColor;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [peerColor](/constructor/peerColor.md) | Represents a [color palette »](/api/colors.md). |
| [peerColorCollectible](/constructor/peerColorCollectible.md) | Represents a [color palette »](/api/colors.md) associated to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/colors.md#collectible-gift-palettes) for more info. |
| [inputPeerColorCollectible](/constructor/inputPeerColorCollectible.md) | Represents a [color palette »](/api/colors.md) associated to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/colors.md#collectible-gift-palettes) for more info. |

### Related pages

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!