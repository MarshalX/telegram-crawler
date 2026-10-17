# messageActionPaymentSent

A payment was sent

```tl
messageActionPaymentSent#c624b16e flags:# recurring_init:flags.2?true recurring_used:flags.3?true currency:string total_amount:long invoice_slug:flags.0?string subscription_until_date:flags.4?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **recurring\_init** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is the first payment of a recurring payment we just subscribed to |
| **recurring\_used** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this payment is part of a recurring payment |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **total\_amount** | [long](/type/long.md) | Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **invoice\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | An invoice slug taken from an [invoice deep link](/api/links.md#invoice-links) or from the [`premium_invoice_slug` app config parameter »](/api/config.md#premium-invoice-slug) |
| **subscription\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Expiration date of the [Telegram Star subscription »](/api/stars.md#star-subscriptions). |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.