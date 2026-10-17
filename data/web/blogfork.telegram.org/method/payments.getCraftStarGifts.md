# payments.getCraftStarGifts

Obtain owned [collectible gifts »](/api/gifts.md#collectible-gifts) of a specific type that can be used for [crafting »](/api/gifts.md#crafting-collectible-gifts).

```tl
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;
---functions---
payments.getCraftStarGifts#fd05dd00 gift_id:long offset:string limit:int = payments.SavedStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **gift\_id** | [long](/type/long.md) | Identifier of the base gift type, equal to [starGiftUnique](/constructor/starGiftUnique.md).`gift_id` of the first selected gift. |
| **offset** | [string](/type/string.md) | Offset for pagination. |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.SavedStarGifts](/type/payments.SavedStarGifts.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_INVALID | The passed gift is invalid. |

### Related pages

#### [starGiftUnique](/constructor/starGiftUnique.md)
Represents a [collectible star gift, see here »](/api/gifts.md#collectible-gifts) for more info.

The sticker that represents the gift is contained in a [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) object in `attributes`.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.