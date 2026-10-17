# payments.getStarGiftUpgradePreview

Obtain a preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info.

```tl
payments.starGiftUpgradePreview#3de1dfed sample_attributes:Vector<StarGiftAttribute> prices:Vector<StarGiftUpgradePrice> next_prices:Vector<StarGiftUpgradePrice> = payments.StarGiftUpgradePreview;
---functions---
payments.getStarGiftUpgradePreview#9c9abcb1 gift_id:long = payments.StarGiftUpgradePreview;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift\_id** | [long](/type/long.md) | The gift to upgrade. |

### Result
[payments.StarGiftUpgradePreview](/type/payments.StarGiftUpgradePreview.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |
| 400 | STARGIFT\_UPGRADE\_UNAVAILABLE | A received gift can only be upgraded to a collectible gift if the [messageActionStarGift](/constructor/messageActionStarGift.md)/[savedStarGift](/constructor/savedStarGift.md).`can_upgrade` flag is set. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [savedStarGift](/constructor/savedStarGift.md)
Represents a [gift](/api/gifts.md) owned by a peer.