# payments.sendPaymentForm

Send compiled payment form

```tl
payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;
---functions---
payments.sendPaymentForm#2d03522f flags:# form_id:long invoice:InputInvoice requested_info_id:flags.0?string shipping_option_id:flags.1?string credentials:InputPaymentCredentials tip_amount:flags.2?long = payments.PaymentResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **form\_id** | [long](/type/long.md) | Form ID |
| **invoice** | [InputInvoice](/type/InputInvoice.md) | Invoice |
| **requested\_info\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | ID of saved and validated [order info](/constructor/payments.validatedRequestedInfo.md) |
| **shipping\_option\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Chosen shipping option ID |
| **credentials** | [InputPaymentCredentials](/type/InputPaymentCredentials.md) | Payment credentials |
| **tip\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | Tip, in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |

### Result
[payments.PaymentResult](/type/payments.PaymentResult.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FORM\_UNSUPPORTED | Please update your client. |
| 400 | INVOICE\_INVALID | The specified invoice is invalid. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PAYMENT\_CREDENTIALS\_INVALID | The specified payment credentials are invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TMP\_PASSWORD\_INVALID | The passed tmp_password is invalid. |

### Related pages

#### [payments.ValidatedRequestedInfo](/constructor/payments.validatedRequestedInfo.md)
Validated user-provided info

#### [Bot Payments API](/bots/payments.md)