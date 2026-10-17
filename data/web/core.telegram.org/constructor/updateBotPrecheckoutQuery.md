# updateBotPrecheckoutQuery

This object contains information about an incoming pre-checkout query.

```tl
updateBotPrecheckoutQuery#8caa9a96 flags:# query_id:long user_id:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string currency:string total_amount:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Unique query identifier |
| **user\_id** | [long](/type/long.md) | User who sent the query |
| **payload** | [bytes](/type/bytes.md) | Bot specified invoice payload |
| **info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Order info provided by the user |
| **shipping\_option\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Identifier of the shipping option chosen by the user |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **total\_amount** | [long](/type/long.md) | Total amount in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.