# account.sendVerifyEmailCode

Send an email verification code.

```tl
account.sentEmailCode#811f854f email_pattern:string length:int = account.SentEmailCode;
---functions---
account.sendVerifyEmailCode#98e037bb purpose:EmailVerifyPurpose email:string = account.SentEmailCode;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [EmailVerifyPurpose](/type/EmailVerifyPurpose.md) | Verification purpose. |
| **email** | [string](/type/string.md) | The email where to send the code. |

### Result
[account.SentEmailCode](/type/account.SentEmailCode.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMAIL\_INVALID | The specified email is invalid. |
| 400 | EMAIL\_NOT\_ALLOWED | The specified email cannot be used to complete the operation. |
| 400 | EMAIL\_NOT\_SETUP | In order to change the login email with emailVerifyPurposeLoginChange, an existing login email must already be set using emailVerifyPurposeLoginSetup. |
| 400 | PHONE\_CODE\_EMPTY | phone_code is missing. |
| 400 | PHONE\_HASH\_EXPIRED | An invalid or expired `phone_code_hash` was provided. |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |