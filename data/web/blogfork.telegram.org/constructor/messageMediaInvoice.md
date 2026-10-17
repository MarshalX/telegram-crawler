# messageMediaInvoice

Invoice

```tl
messageMediaInvoice#f6a548d3 flags:# shipping_address_requested:flags.1?true test:flags.3?true title:string description:string photo:flags.0?WebDocument receipt_msg_id:flags.2?int currency:string total_amount:long start_param:string extended_media:flags.4?MessageExtendedMedia = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **shipping\_address\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the shipping address was requested |
| **test** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is an example invoice |
| **title** | [string](/type/string.md) | Product name, 1-32 characters |
| **description** | [string](/type/string.md) | Product description, 1-255 characters |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[WebDocument](/type/WebDocument.md) | URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. |
| **receipt\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Message ID of receipt: if set, clients should change the text of the first [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) button always attached to the [message](/constructor/message.md) to a localized version of the word `Receipt` |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code, or `XTR` for [Telegram Stars](/api/stars.md). |
| **total\_amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **start\_param** | [string](/type/string.md) | Unique bot deep-linking parameter that can be used to generate this invoice |
| **extended\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[MessageExtendedMedia](/type/MessageExtendedMedia.md) | Deprecated |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [keyboardButtonBuy](/constructor/keyboardButtonBuy.md)
Button to buy a product

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must start the [payment flow for the attached invoice](/api/payments.md).

#### [message](/constructor/message.md)
A message

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.