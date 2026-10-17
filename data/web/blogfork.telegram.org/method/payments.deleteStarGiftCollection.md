# payments.deleteStarGiftCollection

Delete a [star gift collection »](/api/gifts.md#gift-collections).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.deleteStarGiftCollection#ad5648e8 peer:InputPeer collection_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer that owns the collection. |
| **collection\_id** | [int](/type/int.md) | ID of the collection. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.