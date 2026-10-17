# payments.saveStarGift

Display or remove a [received or hosted gift »](/api/gifts.md#hosted-collectible-gifts) from our profile.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.saveStarGift#2a2a697c flags:# unsave:flags.0?true stargift:InputSavedStarGift = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unsave** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, hides the gift from our profile. |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The gift to display or remove. A [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) may be used by its host or owner. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | SAVED\_ID\_EMPTY | The passed inputSavedStarGiftChat.saved_id is empty. |
| 400 | STARGIFT\_OBJECT\_INVALID | The specified star gift object is invalid. |
| 400 | STARGIFT\_OWNER\_INVALID | You cannot transfer or sell a gift owned by another user. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.