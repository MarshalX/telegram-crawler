# starsSubscriptionPricing

Pricing of a [Telegram Star subscription »](/api/invites.md#paid-invite-links).

```tl
starsSubscriptionPricing#5416d58 period:int amount:long = StarsSubscriptionPricing;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **period** | [int](/type/int.md) | The user should pay `amount` stars every `period` seconds to gain and maintain access to the channel. \
Currently the only allowed subscription period is `30*24*60*60`, i.e. the user will be debited amount stars every month. |
| **amount** | [long](/type/long.md) | Price of the subscription in Telegram Stars. |

### Type
[StarsSubscriptionPricing](/type/StarsSubscriptionPricing.md)

### Related pages

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.