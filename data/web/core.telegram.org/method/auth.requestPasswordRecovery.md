# auth.requestPasswordRecovery

Request recovery code of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification).

```tl
auth.passwordRecovery#137948a5 email_pattern:string = auth.PasswordRecovery;
---functions---
auth.requestPasswordRecovery#d897bc66 = auth.PasswordRecovery;
```

### Parameters

This constructor does not require any parameters.

### Result
[auth.PasswordRecovery](/type/auth.PasswordRecovery.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_EMPTY | The provided password is empty. |
| 400 | PASSWORD\_RECOVERY\_NA | No email was set, can't recover password via email. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.