# inputInvoicePremiumGiftStars

Used to gift a [Telegram Premium](/api/premium.md) subscription to another user, paying with [Telegram Stars](/api/stars.md).

```tl
inputInvoicePremiumGiftStars#dabab2ef flags:# user_id:InputUser months:int message:flags.0?TextWithEntities = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [InputUser](/type/InputUser.md) | Who will receive the gifted subscription. |
| **months** | [int](/type/int.md) | Duration of the subscription in months, must be one of the options with `currency == "XTR"` returned by [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md). |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[TextWithEntities](/type/TextWithEntities.md) | Message attached with the gift. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [payments.getPremiumGiftCodeOptions](/method/payments.getPremiumGiftCodeOptions.md)
Obtain a list of Telegram Premium [giveaway/gift code »](/api/giveaways.md) options.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.