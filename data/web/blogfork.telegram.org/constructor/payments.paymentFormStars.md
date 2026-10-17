# payments.paymentFormStars

Represents a payment form, for payments to be using [Telegram Stars, see here »](/api/stars.md) for more info.

```tl
payments.paymentFormStars#7bf6b15c flags:# form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice users:Vector<User> = payments.PaymentForm;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **form\_id** | [long](/type/long.md) | Form ID. |
| **bot\_id** | [long](/type/long.md) | Bot ID. |
| **title** | [string](/type/string.md) | Form title |
| **description** | [string](/type/string.md) | Description |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[WebDocument](/type/WebDocument.md) | Product photo |
| **invoice** | [Invoice](/type/Invoice.md) | Invoice |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about users mentioned in the other fields. |

### Type
[payments.PaymentForm](/type/payments.PaymentForm.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.