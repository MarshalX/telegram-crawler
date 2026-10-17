# payments.validateRequestedInfo

Submit requested order information for validation

```tl
payments.validatedRequestedInfo#d1451883 flags:# id:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = payments.ValidatedRequestedInfo;
---functions---
payments.validateRequestedInfo#b6c8f12b flags:# save:flags.0?true invoice:InputInvoice info:PaymentRequestedInfo = payments.ValidatedRequestedInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **save** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Save order information to re-use it for future orders |
| **invoice** | [InputInvoice](/type/InputInvoice.md) | Invoice |
| **info** | [PaymentRequestedInfo](/type/PaymentRequestedInfo.md) | Requested order information |

### Result
[payments.ValidatedRequestedInfo](/type/payments.ValidatedRequestedInfo.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |