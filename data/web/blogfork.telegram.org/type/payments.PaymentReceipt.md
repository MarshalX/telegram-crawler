# Payments.PaymentReceipt

Payment receipt

```tl
payments.paymentReceipt#70c4fe03 flags:# date:int bot_id:long provider_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice info:flags.0?PaymentRequestedInfo shipping:flags.1?ShippingOption tip_amount:flags.3?long currency:string total_amount:long credentials_title:string users:Vector<User> = payments.PaymentReceipt;
payments.paymentReceiptStars#dabbf83a flags:# date:int bot_id:long title:string description:string photo:flags.2?WebDocument invoice:Invoice currency:string total_amount:long transaction_id:string users:Vector<User> = payments.PaymentReceipt;

---functions---

payments.getPaymentReceipt#2478d1cc peer:InputPeer msg_id:int = payments.PaymentReceipt;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.paymentReceipt](/constructor/payments.paymentReceipt.md) | Receipt |
| [payments.paymentReceiptStars](/constructor/payments.paymentReceiptStars.md) | Receipt for [payment made using Telegram Stars](/api/stars.md). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getPaymentReceipt](/method/payments.getPaymentReceipt.md) | Get payment receipt |