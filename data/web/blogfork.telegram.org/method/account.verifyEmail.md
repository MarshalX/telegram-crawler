# account.verifyEmail

Verify an email address.

```tl
account.emailVerified#2b96cd1b email:string = account.EmailVerified;
account.emailVerifiedLogin#e1bb0d61 email:string sent_code:auth.SentCode = account.EmailVerified;
---functions---
account.verifyEmail#32da4cf purpose:EmailVerifyPurpose verification:EmailVerification = account.EmailVerified;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purpose** | [EmailVerifyPurpose](/type/EmailVerifyPurpose.md) | Verification purpose |
| **verification** | [EmailVerification](/type/EmailVerification.md) | Email verification code or token |

### Result
[account.EmailVerified](/type/account.EmailVerified.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CODE\_INVALID | Code invalid. |
| 400 | EMAIL\_INVALID | The specified email is invalid. |
| 400 | EMAIL\_NOT\_ALLOWED | The specified email cannot be used to complete the operation. |
| 400 | EMAIL\_VERIFY\_EXPIRED | The verification email has expired. |
| 400 | PHONE\_CODE\_EXPIRED | The phone code you provided has expired. |
| 400 | PHONE\_NUMBER\_INVALID | The phone number is invalid. |