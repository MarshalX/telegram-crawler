# premiumGiftCodeOption

Contains info about a [giveaway/gift](/api/giveaways.md) option.

```tl
premiumGiftCodeOption#257e962b flags:# users:int months:int store_product:flags.0?string store_quantity:flags.1?int currency:string amount:long = PremiumGiftCodeOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **users** | [int](/type/int.md) | Number of users which will be able to activate the gift codes. |
| **months** | [int](/type/int.md) | Duration in months of each gifted [Telegram Premium](/api/premium.md) subscription. |
| **store\_product** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Identifier of the store product associated with the option, official apps only. |
| **store\_quantity** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Number of times the store product must be paid |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[PremiumGiftCodeOption](/type/PremiumGiftCodeOption.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Bot Payments API](/bots/payments.md)

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.