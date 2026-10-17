# premiumSubscriptionOption

Describes a Telegram Premium subscription option

```tl
premiumSubscriptionOption#5f2d1df2 flags:# current:flags.1?true can_purchase_upgrade:flags.2?true transaction:flags.3?string months:int currency:string amount:long bot_url:string store_product:flags.0?string = PremiumSubscriptionOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **current** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this subscription option is currently in use. |
| **can\_purchase\_upgrade** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this subscription option can be used to upgrade the existing Telegram Premium subscription. When upgrading Telegram Premium subscriptions bought through stores, make sure that the store transaction ID is equal to `transaction`, to avoid upgrading someone else's account, if the client is currently logged into multiple accounts. |
| **transaction** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Identifier of the last in-store transaction for the currently used subscription on the current account. |
| **months** | [int](/type/int.md) | Duration of subscription in months |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **bot\_url** | [string](/type/string.md) | [Deep link](/api/links.md) used to initiate payment |
| **store\_product** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Store product ID, only for official apps |

### Type
[PremiumSubscriptionOption](/type/PremiumSubscriptionOption.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.