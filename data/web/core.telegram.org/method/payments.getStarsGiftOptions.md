# payments.getStarsGiftOptions

Obtain a list of [Telegram Stars gift options »](/api/stars.md#buying-or-gifting-stars) as [starsGiftOption](/constructor/starsGiftOption.md) constructors.

```tl
---functions---
payments.getStarsGiftOptions#d3c96bc8 flags:# user_id:flags.0?InputUser = Vector<StarsGiftOption>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputUser](/type/InputUser.md) | Receiver of the gift (optional). |

### Result
[Vector](/type/Vector%20t)&lt;[StarsGiftOption](/type/StarsGiftOption.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | USER\_GIFT\_UNAVAILABLE | Gifts are not available in the current region ([stars_gifts_enabled](/api/config.md#stars-gifts-enabled) is equal to false). |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [starsGiftOption](/constructor/starsGiftOption.md)
[Telegram Stars gift option](/api/stars.md#buying-or-gifting-stars).

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.