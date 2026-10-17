# mediaAreaStarGift

Represents a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
mediaAreaStarGift#5787686d coordinates:MediaAreaCoordinates slug:string = MediaArea;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **coordinates** | [MediaAreaCoordinates](/type/MediaAreaCoordinates.md) | Coordinates of the media area. |
| **slug** | [string](/type/string.md) | `slug` from [starGiftUnique](/constructor/starGiftUnique.md).`slug`, that can be resolved as [specified here »](/api/gifts.md#sharing-and-getting-info-about-a-collectible-gift). |

### Type
[MediaArea](/type/MediaArea.md)

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.