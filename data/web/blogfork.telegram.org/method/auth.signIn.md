# auth.signIn

Signs in a user with a validated phone number.

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.signIn#8d52a951 flags:# phone_number:string phone_code_hash:string phone_code:flags.0?string email_verification:flags.1?EmailVerification = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **phone\_number** | [string](/type/string.md) | Phone number in the international format |
| **phone\_code\_hash** | [string](/type/string.md) | SMS-message ID, obtained from [auth.sendCode](/method/auth.sendCode.md) |
| **phone\_code** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Valid numerical code from the SMS-message |
| **email\_verification** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[EmailVerification](/type/EmailVerification.md) | Email verification code or token |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 500 | AUTH\_RESTART | Restart the authorization process. |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_CODE\_INVALID | The provided phone code is invalid. |
| 406 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |
| 400 | PHONE\_NUMBER\_UNOCCUPIED | The phone number is not yet being used. |
| 500 | SIGN\_IN\_FAILED | Failure while signing in. |
| 406 | UPDATE\_APP\_TO\_LOGIN | Please update your client to login. |

### Related pages

#### [auth.sendCode](/method/auth.sendCode.md)
Send the verification code for login