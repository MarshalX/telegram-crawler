# starsTopupOption

[Telegram Stars topup option](/api/stars.md).

```tl
starsTopupOption#bd915c0 flags:# extended:flags.1?true stars:long store_product:flags.0?string currency:string amount:long = StarsTopupOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **extended** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the option must only be shown in the full list of topup options. |
| **stars** | [long](/type/long.md) | Amount of Telegram stars. |
| **store\_product** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Identifier of the store product associated with the option, official apps only. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[StarsTopupOption](/type/StarsTopupOption.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.