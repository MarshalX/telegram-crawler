# auth.resendCode

Resend the login code via another medium, the phone code type is determined by the return value of the previous auth.sendCode/auth.resendCode: see [login](/api/auth.md) for more info.

```tl
auth.sentCode#5e002502 flags:# type:auth.SentCodeType phone_code_hash:string next_type:flags.1?auth.CodeType timeout:flags.2?int = auth.SentCode;
auth.sentCodeSuccess#2390fe44 authorization:auth.Authorization = auth.SentCode;
auth.sentCodePaymentRequired#f8827ebf store_product:string phone_code_hash:string support_email_address:string support_email_subject:string premium_days:int currency:string amount:long = auth.SentCode;
---functions---
auth.resendCode#cae47523 flags:# phone_number:string phone_code_hash:string reason:flags.0?string = auth.SentCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **phone\_number** | [string](/type/string.md) | The phone number |
| **phone\_code\_hash** | [string](/type/string.md) | The phone code hash obtained from [auth.sendCode](/method/auth.sendCode.md) |
| **reason** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Official clients only, used if the device integrity verification failed, and no secret could be obtained to invoke [auth.requestFirebaseSms](/method/auth.requestFirebaseSms.md): in this case, the device integrity verification failure reason must be passed here. |

### Result
[auth.SentCode](/type/auth.SentCode.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMAIL\_INSTALL\_MISSING | Attempting to send a code to the recovery email, but no email is configured. |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_CODE\_HASH\_EMPTY | phone_code_hash is missing. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 406 | SEND\_CODE\_UNAVAILABLE | Returned when all available options for this type of number were already used (e.g. flash-call, then SMS, then this error might be returned to trigger a second resend). |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login

#### [auth.requestFirebaseSms](/method/auth.requestFirebaseSms.md)
Request an SMS code via Firebase.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.