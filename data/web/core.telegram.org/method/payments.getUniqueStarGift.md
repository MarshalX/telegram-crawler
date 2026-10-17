# payments.getUniqueStarGift

Obtain info about a [collectible gift »](/api/gifts.md#collectible-gifts) using a slug obtained from a [collectible gift link »](/api/links.md#collectible-gift-link).

```tl
payments.uniqueStarGift#416c56e8 gift:StarGift chats:Vector<Chat> users:Vector<User> = payments.UniqueStarGift;
---functions---
payments.getUniqueStarGift#a1974d72 slug:string = payments.UniqueStarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | The slug. |

### Result
[payments.UniqueStarGift](/type/payments.UniqueStarGift.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARGIFT\_SLUG\_INVALID | The specified gift slug is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.