# payments.paymentForm

Payment form

```tl
payments.paymentForm#a0058751 flags:# can_save_credentials:flags.2?true password_missing:flags.3?true form_id:long bot_id:long title:string description:string photo:flags.5?WebDocument invoice:Invoice provider_id:long url:string native_provider:flags.4?string native_params:flags.4?DataJSON additional_methods:flags.6?Vector<PaymentFormMethod> saved_info:flags.0?PaymentRequestedInfo saved_credentials:flags.1?Vector<PaymentSavedCredentials> users:Vector<User> = payments.PaymentForm;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_save\_credentials** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the user can choose to save credentials. |
| **password\_missing** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Indicates that the user can save payment credentials, but only after setting up a [2FA password](/api/srp.md) (currently the account doesn't have a [2FA password](/api/srp.md)) |
| **form\_id** | [long](/type/long.md) | Form ID |
| **bot\_id** | [long](/type/long.md) | Bot ID |
| **title** | [string](/type/string.md) | Form title |
| **description** | [string](/type/string.md) | Description |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[WebDocument](/type/WebDocument.md) | Product photo |
| **invoice** | [Invoice](/type/Invoice.md) | Invoice |
| **provider\_id** | [long](/type/long.md) | Payment provider ID. |
| **url** | [string](/type/string.md) | Payment form URL |
| **native\_provider** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Payment provider name.\
One of the following:\
- `stripe` |
| **native\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[DataJSON](/type/DataJSON.md) | Contains information about the payment provider, if available, to support it natively without the need for opening the URL.\
A JSON object that can contain the following fields:\
\
- `apple_pay_merchant_id`: Apple Pay merchant ID\
- `google_pay_public_key`: Google Pay public key\
- `need_country`: True, if the user country must be provided,\
- `need_zip`: True, if the user ZIP/postal code must be provided,\
- `need_cardholder_name`: True, if the cardholder name must be provided\
 |
| **additional\_methods** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[Vector](/type/Vector%20t)&lt;[PaymentFormMethod](/type/PaymentFormMethod.md)&gt; | Additional payment methods |
| **saved\_info** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Saved server-side order information |
| **saved\_credentials** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[PaymentSavedCredentials](/type/PaymentSavedCredentials.md)&gt; | Contains information about saved card credentials |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users |

### Type
[payments.PaymentForm](/type/payments.PaymentForm.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.