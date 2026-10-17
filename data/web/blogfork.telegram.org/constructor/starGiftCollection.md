# starGiftCollection

Represents a [star gift collection »](/api/gifts.md#gift-collections).

```tl
starGiftCollection#9d6b13b0 flags:# collection_id:int title:string icon:flags.0?Document gifts_count:int hash:long = StarGiftCollection;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **collection\_id** | [int](/type/int.md) | The ID of the collection. |
| **title** | [string](/type/string.md) | Title of the collection. |
| **icon** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Document](/type/Document.md) | Optional icon for the collection, taken from the first gift in the collection. |
| **gifts\_count** | [int](/type/int.md) | Number of gifts in the collection. |
| **hash** | [long](/type/long.md) | Field to use **instead of `collection_id`** when generating the hash to pass to [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md). |

### Type
[StarGiftCollection](/type/StarGiftCollection.md)

### Related pages

#### [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md)
Fetches all [star gift collections »](/api/gifts.md#gift-collections) of a peer.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.