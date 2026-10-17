# inputBotInlineMessageMediaInvoice

An invoice

```tl
inputBotInlineMessageMediaInvoice#d7e78225 flags:# title:string description:string photo:flags.0?InputWebDocument invoice:Invoice payload:bytes provider:string provider_data:DataJSON reply_markup:flags.2?ReplyMarkup = InputBotInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **title** | [string](/type/string.md) | Product name, 1-32 characters |
| **description** | [string](/type/string.md) | Product description, 1-255 characters |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputWebDocument](/type/InputWebDocument.md) | Invoice photo |
| **invoice** | [Invoice](/type/Invoice.md) | The invoice |
| **payload** | [bytes](/type/bytes.md) | Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes. |
| **provider** | [string](/type/string.md) | Payments provider token, obtained via [Botfather](https://t.me/botfather) |
| **provider\_data** | [DataJSON](/type/DataJSON.md) | A JSON-serialized object for data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider. |
| **reply\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ReplyMarkup](/type/ReplyMarkup.md) | Inline keyboard |

### Type
[InputBotInlineMessage](/type/InputBotInlineMessage.md)