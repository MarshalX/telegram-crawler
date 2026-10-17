# paymentRequestedInfo

Order info provided by the user

```tl
paymentRequestedInfo#909c3f94 flags:# name:flags.0?string phone:flags.1?string email:flags.2?string shipping_address:flags.3?PostAddress = PaymentRequestedInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | User's full name |
| **phone** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | User's phone number |
| **email** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | User's email address |
| **shipping\_address** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[PostAddress](/type/PostAddress.md) | User's shipping address |

### Type
[PaymentRequestedInfo](/type/PaymentRequestedInfo.md)