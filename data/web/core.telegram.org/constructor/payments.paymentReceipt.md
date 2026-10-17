# payments.paymentReceipt

Receipt

```tl
payments.paymentReceipt#70c4fe03 flags:# date:int bot_id:long provider_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice info:flags.0?PaymentRequestedInfo shipping:flags.1?ShippingOption tip_amount:flags.3?long currency:string total_amount:long credentials_title:string users:Vector<User> = payments.PaymentReceipt;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **date** | [int](/type/int.md) | Date of generation |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **provider\_id** | [long](/type/long.md) | Provider ID |
| **title** | [string](/type/string.md) | Title |
| **description** | [string](/type/string.md) | Description |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WebDocument](/type/WebDocument.md) | Photo |
| **invoice** | [Invoice](/type/Invoice.md) | Invoice |
| **info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Info |
| **shipping** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ShippingOption](/type/ShippingOption.md) | Selected shipping option |
| **tip\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | Tipped amount |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **total\_amount** | [long](/type/long.md) | Total amount in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **credentials\_title** | [string](/type/string.md) | Payment credential name |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users |

### Type
[payments.PaymentReceipt](/type/payments.PaymentReceipt.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)