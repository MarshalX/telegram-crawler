# payments.getStarGiftCollections

Fetches all [star gift collections »](/api/gifts.md#gift-collections) of a peer.

```tl
payments.starGiftCollectionsNotModified#a0ba4f17 = payments.StarGiftCollections;
payments.starGiftCollections#8a2932f3 collections:Vector<StarGiftCollection> = payments.StarGiftCollections;
---functions---
payments.getStarGiftCollections#981b91dd peer:InputPeer hash:long = payments.StarGiftCollections;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer. |
| **hash** | [long](/type/long.md) | Hash ([generated as specified here »](/api/offsets.md#hash-generation)) using the [starGiftCollection](/constructor/starGiftCollection.md).`hash` field (**not** the `collection_id` field) of all collections returned by a previous method call, to avoid refetching the result if it hasn't changed. |

### Result
[payments.StarGiftCollections](/type/payments.StarGiftCollections.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [starGiftCollection](/constructor/starGiftCollection.md)
Represents a [star gift collection »](/api/gifts.md#gift-collections).

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.