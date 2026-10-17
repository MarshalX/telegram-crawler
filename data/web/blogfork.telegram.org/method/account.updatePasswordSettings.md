# account.updatePasswordSettings

Set a new 2FA password

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updatePasswordSettings#a59b102f password:InputCheckPasswordSRP new_settings:account.PasswordInputSettings = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | The old password (see [SRP](/api/srp.md)) |
| **new\_settings** | [account.PasswordInputSettings](/type/account.PasswordInputSettings.md) | The new password (see [SRP](/api/srp.md)) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMAIL\_INVALID | The specified email is invalid. |
| 400 | EMAIL\_UNCONFIRMED | Email unconfirmed. |
| 400 | EMAIL\_UNCONFIRMED\_%d | The provided email isn't confirmed, %d is the length of the verification code that was just sent to the email: use [account.verifyEmail](/method/account.verifyEmail.md) to enter the received verification code and enable the recovery email. |
| 400 | NEW\_SALT\_INVALID | The new salt is invalid. |
| 400 | NEW\_SETTINGS\_EMPTY | No password is set on the current account, and no new password was specified in `new_settings`. |
| 400 | NEW\_SETTINGS\_INVALID | The new password settings are invalid. |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | SRP\_ID\_INVALID | Invalid SRP ID provided. |
| 400 | SRP\_PASSWORD\_CHANGED | Password has changed. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [account.verifyEmail](/method/account.verifyEmail.md)
Verify an email address.