# auth.sentCode

Contains info about a sent verification code.

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **type** | [auth.SentCodeType](/type/auth.SentCodeType.md) | Phone code type |
| **phone\_code\_hash** | [string](/type/string.md) | Phone code hash, to be stored and later re-used with [auth.signIn](/method/auth.signIn.md) |
| **next\_type** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[auth.CodeType](/type/auth.CodeType.md) | Phone code type that will be sent next, if the phone code is not received within `timeout` seconds: to send it use [auth.resendCode](/method/auth.resendCode.md) |
| **timeout** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Timeout for reception of the phone code |

### Type
[auth.SentCode](/type/auth.SentCode.md)

### Related pages

#### [auth.signIn](/method/auth.signIn.md)
Signs in a user with a validated phone number.

#### [auth.resendCode](/method/auth.resendCode.md)
Resend the login code via another medium, the phone code type is determined by the return value of the previous auth.sendCode/auth.resendCode: see [login](/api/auth.md) for more info.