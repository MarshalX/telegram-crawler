# payments.getStarGiftUpgradeAttributes

Obtains the **full** list of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

The result may also include [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) constructors with the `crafted` flag set: these models are reserved for [crafting »](/api/gifts.md#crafting-collectible-gifts) and should be filtered out from regular upgrade previews (and vice versa).

```tl
payments.starGiftUpgradeAttributes#46c6e36f attributes:Vector<StarGiftAttribute> = payments.StarGiftUpgradeAttributes;
---functions---
payments.getStarGiftUpgradeAttributes#6d038b58 gift_id:long = payments.StarGiftUpgradeAttributes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift\_id** | [long](/type/long.md) | Non-collectible base gift ID, from [starGift](/constructor/starGift.md).`id` |

### Result
[payments.StarGiftUpgradeAttributes](/type/payments.StarGiftUpgradeAttributes.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |

### Related pages

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGiftAttributeModel](/constructor/starGiftAttributeModel.md)
The model of a [collectible gift »](/api/gifts.md#collectible-gifts).