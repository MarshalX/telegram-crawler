# Payments.PaymentResult

Payment result

```tl
payments.paymentResult#4e5f810d updates:Updates = payments.PaymentResult;
payments.paymentVerificationNeeded#d8411139 url:string = payments.PaymentResult;

---functions---

payments.sendPaymentForm#2d03522f flags:# form_id:long invoice:InputInvoice requested_info_id:flags.0?string shipping_option_id:flags.1?string credentials:InputPaymentCredentials tip_amount:flags.2?long = payments.PaymentResult;
payments.sendStarsForm#7998c914 form_id:long invoice:InputInvoice = payments.PaymentResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.paymentResult](/constructor/payments.paymentResult.md) | Payment result |
| [payments.paymentVerificationNeeded](/constructor/payments.paymentVerificationNeeded.md) | Payment was not successful, additional verification is needed |

### Methods

| Method | Description |
| --- | --- |
| [payments.sendPaymentForm](/method/payments.sendPaymentForm.md) | Send compiled payment form |
| [payments.sendStarsForm](/method/payments.sendStarsForm.md) | Make a payment using [Telegram Stars, see here »](/api/stars.md#using-stars) for more info. |