# inputInvoicePremiumAuthCode

Used to pay for login codes, in case of high cost of SMS verification codes for the user's country/provider, see [here »](/api/auth.md#paid-auth) for more info.

```tl
inputInvoicePremiumAuthCode#3e77f614 purpose:InputStorePaymentPurpose = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md) | Must contain an [inputStorePaymentAuthCode](/constructor/inputStorePaymentAuthCode.md). |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [inputStorePaymentAuthCode](/constructor/inputStorePaymentAuthCode.md)
Indicates payment for a login code.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.