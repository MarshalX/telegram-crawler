# Payments.ValidatedRequestedInfo

Validated requested info

```tl
payments.validatedRequestedInfo#d1451883 flags:# id:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = payments.ValidatedRequestedInfo;

---functions---

payments.validateRequestedInfo#b6c8f12b flags:# save:flags.0?true invoice:InputInvoice info:PaymentRequestedInfo = payments.ValidatedRequestedInfo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.validatedRequestedInfo](/constructor/payments.validatedRequestedInfo.md) | Validated user-provided info |

### Methods

| Method | Description |
| --- | --- |
| [payments.validateRequestedInfo](/method/payments.validateRequestedInfo.md) | Submit requested order information for validation |