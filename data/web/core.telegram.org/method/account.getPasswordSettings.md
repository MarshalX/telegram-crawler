# account.getPasswordSettings

Get private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on)

```tl
account.passwordSettings#9a5c33e5 flags:# email:flags.0?string secure_settings:flags.1?SecureSecretSettings = account.PasswordSettings;
---functions---
account.getPasswordSettings#9cd4eaf9 password:InputCheckPasswordSRP = account.PasswordSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | The password (see [SRP](/api/srp.md)) |

### Result
[account.PasswordSettings](/type/account.PasswordSettings.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.