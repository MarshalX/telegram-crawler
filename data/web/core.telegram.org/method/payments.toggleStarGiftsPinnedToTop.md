# payments.toggleStarGiftsPinnedToTop

Pins a received gift on top of the profile of the user or owned channels by using [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.toggleStarGiftsPinnedToTop#1513e7b0 peer:InputPeer stargift:Vector<InputSavedStarGift> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer where to pin the gift. |
| **stargift** | [Vector](/type/Vector%20t)&lt;[InputSavedStarGift](/type/InputSavedStarGift.md)&gt; | The gift to pin. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md)
Pins a received gift on top of the profile of the user or owned channels by using [payments.toggleStarGiftsPinnedToTop](/method/payments.toggleStarGiftsPinnedToTop.md).