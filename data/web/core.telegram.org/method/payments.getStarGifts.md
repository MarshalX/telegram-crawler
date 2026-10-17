# payments.getStarGifts

Get a list of available [gifts, see here »](/api/gifts.md) for more info.

```tl
payments.starGiftsNotModified#a388a368 = payments.StarGifts;
payments.starGifts#2ed82995 hash:int gifts:Vector<StarGift> chats:Vector<Chat> users:Vector<User> = payments.StarGifts;
---functions---
payments.getStarGifts#c4563590 hash:int = payments.StarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation).\
The hash may be generated locally by using the `id`s of the returned or stored sticker [starGift](/constructor/starGift.md)s. |

### Result
[payments.StarGifts](/type/payments.StarGifts.md)

### Both users and bots can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.