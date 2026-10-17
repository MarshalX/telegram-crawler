# botInlineMessageMediaInvoice

Send an invoice

```tl
botInlineMessageMediaInvoice#354a9b09 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument currency:string total_amount:long reply_markup:flags.2?ReplyMarkup = BotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **shipping\_address\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag if you require the user's shipping address to complete the order |
| **test** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Test invoice |
| **title** | [string](/type/string.md) | Product name, 1-32 characters |
| **description** | [string](/type/string.md) | Product description, 1-255 characters |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[WebDocument](/type/WebDocument.md) | Product photo |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **total\_amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[BotInlineMessage](/type/BotInlineMessage.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.