# messageActionPaymentSentMe

A user just sent a payment to me (a bot)

```tl
messageActionPaymentSentMe#ffa00ccc flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long payload:bytes info:flags.0?PaymentRequestedInfo shipping_option_id:flags.1?string charge:PaymentCharge subscription_until_date:flags.4?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **recurring\_init** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is the first payment of a recurring payment we just subscribed to |
| **recurring\_used** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this payment is part of a recurring payment |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **total\_amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **payload** | [bytes](/type/bytes.md) | Bot specified invoice payload |
| **info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Order info provided by the user |
| **shipping\_option\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Identifier of the shipping option chosen by the user |
| **charge** | [PaymentCharge](/type/PaymentCharge.md) | Provider payment identifier |
| **subscription\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Expiration date of the [Telegram Star subscription »](/api/stars.md#star-subscriptions). |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.