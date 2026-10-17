# payments.paymentReceiptStars

Receipt for [payment made using Telegram Stars](/api/stars.md).

```tl
payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **date** | [int](/type/int.md) | Date of generation |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **title** | [string](/type/string.md) | Title |
| **description** | [string](/type/string.md) | Description |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WebDocument](/type/WebDocument.md) | Product photo |
| **invoice** | [Invoice](/type/Invoice.md) | Invoice |
| **currency** | [string](/type/string.md) | Currency, always `XTR`. |
| **total\_amount** | [long](/type/long.md) | Amount of [Telegram Stars](/api/stars.md). |
| **transaction\_id** | [string](/type/string.md) | Transaction ID |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about users mentioned in the other fields. |

### Type
[payments.PaymentReceipt](/type/payments.PaymentReceipt.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.