# payments.canPurchaseStore

Checks whether a purchase is possible. Must be called before in-store purchase, official apps only.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.canPurchaseStore#4fdc5ea7 purpose:InputStorePaymentPurpose = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md) | Payment purpose. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | INPUT\_PURPOSE\_INVALID | The specified payment purpose is invalid. |
| 406 | PREMIUM\_CURRENTLY\_UNAVAILABLE | You cannot currently purchase a Premium subscription. |