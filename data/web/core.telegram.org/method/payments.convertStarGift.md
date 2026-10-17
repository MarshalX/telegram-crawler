# payments.convertStarGift

Convert a [received gift »](/api/gifts.md) into Telegram Stars: this will permanently destroy the gift, converting it into [starGift](/constructor/starGift.md).`convert_stars` [Telegram Stars](/api/stars.md), added to the user's balance.

Note that [starGift](/constructor/starGift.md).`convert_stars` will be less than the buying price ([starGift](/constructor/starGift.md).`stars`) of the gift if it was originally bought using Telegram Stars bought a long time ago.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.convertStarGift#74bf076b stargift:InputSavedStarGift = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The gift to convert. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over a [business connection &raquo;](/api/bots/connected-business-bots.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUSINESS\_CONNECTION\_INVALID | The `connection_id` passed to the wrapping [invokeWithBusinessConnection](/api/business.md) call is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | SAVED\_ID\_EMPTY | The passed inputSavedStarGiftChat.saved_id is empty. |
| 400 | STARGIFT\_PEER\_INVALID | The specified inputSavedStarGiftChat.peer is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.