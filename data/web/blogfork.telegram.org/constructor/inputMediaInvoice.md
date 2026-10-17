# inputMediaInvoice

Generated invoice of a [bot payment](/bots/payments.md)

```tl
inputMediaInvoice#405fef0d flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:flags.3?string provider_data:DataJSON start_param:flags.1?string extended_media:flags.2?InputMedia = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [string](/type/string.md) | Product name, 1-32 characters |
| **description** | [string](/type/string.md) | Product description, 1-255 characters |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputWebDocument](/type/InputWebDocument.md) | URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. |
| **invoice** | [Invoice](/type/Invoice.md) | The actual invoice |
| **payload** | [bytes](/type/bytes.md) | Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. |
| **provider** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Payments provider token, obtained via [Botfather](https://t.me/botfather) |
| **provider\_data** | [DataJSON](/type/DataJSON.md) | JSON-encoded data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. |
| **start\_param** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Unique [bot deep links start parameter](/api/links.md#bot-links). If present, forwarded copies of the sent message will have a URL button with a [deep link](/api/links.md#bot-links) to the bot (instead of a Pay button), with the value used as the start parameter. If absent, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. |
| **extended\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputMedia](/type/InputMedia.md) | Deprecated |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Bot Payments API](/bots/payments.md)