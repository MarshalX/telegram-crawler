# payments.botCancelStarsSubscription

Cancel a [bot subscription](/api/subscriptions.md#bot-subscriptions)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.botCancelStarsSubscription#6dfa0622 flags:# restore:flags.0?true user_id:InputUser charge_id:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **restore** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If **not** set, disables autorenewal of the subscriptions, and prevents the user from reactivating the subscription once the current period expires: a subscription cancelled by the bot will have the [starsSubscription](/constructor/starsSubscription.md).`bot_canceled` flag set.  \
The bot can can partially undo this operation by setting this flag: this will allow the user to reactivate the subscription. |
| **user\_id** | [InputUser](/type/InputUser.md) | The ID of the user whose subscription should be (un)cancelled |
| **charge\_id** | [string](/type/string.md) | The `provider_charge_id` from the [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md) service message sent to the bot for the first subscription payment. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHARGE\_ID\_INVALID | The specified charge_id is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [starsSubscription](/constructor/starsSubscription.md)
Represents a [Telegram Star subscription »](/api/invites.md#paid-invite-links).

#### [messageActionPaymentSentMe](/constructor/messageActionPaymentSentMe.md)
A user just sent a payment to me (a bot)

#### [Star subscriptions](/api/subscriptions.md)
Bots and channels may create subscriptions, periodically charging users a certain amount of Telegram Stars in exchange for content and services.