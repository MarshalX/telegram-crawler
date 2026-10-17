# payments.createStarGiftCollection

Create a [star gift collection »](/api/gifts.md#gift-collections).

```tl
starGiftCollection#9d6b13b0 flags:# collection_id:int title:string icon:flags.0?Document gifts_count:int hash:long = StarGiftCollection;
---functions---
payments.createStarGiftCollection#1f4a0e87 peer:InputPeer title:string stargift:Vector<InputSavedStarGift> = StarGiftCollection;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to create the collection. |
| **title** | [string](/type/string.md) | Title of the collection. |
| **stargift** | [Vector](/type/Vector%20t)&lt;[InputSavedStarGift](/type/InputSavedStarGift.md)&gt; | Gifts added to the collection. |

### Result
[StarGiftCollection](/type/StarGiftCollection.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.