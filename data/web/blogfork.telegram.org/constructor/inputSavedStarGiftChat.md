# inputSavedStarGiftChat

A gift received by a channel we own.

```tl
inputSavedStarGiftChat#f101aa7f peer:InputPeer saved_id:long = InputSavedStarGift;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel. |
| **saved\_id** | [long](/type/long.md) | ID of the gift, must be the `saved_id` of a [messageActionStarGift](/constructor/messageActionStarGift.md)/[messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) constructor. |

### Type
[InputSavedStarGift](/type/InputSavedStarGift.md)

### Related pages

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)
A [gift »](/api/gifts.md) was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).