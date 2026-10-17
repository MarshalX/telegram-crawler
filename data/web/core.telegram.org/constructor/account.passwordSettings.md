# account.passwordSettings

Private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on)

```tl
account.passwordSettings#9a5c33e5 flags:# email:flags.0?string secure_settings:flags.1?SecureSecretSettings = account.PasswordSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **email** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | [2FA Recovery email](/api/srp.md#email-verification) |
| **secure\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[SecureSecretSettings](/type/SecureSecretSettings.md) | Telegram [passport](/passport.md) settings |

### Type
[account.PasswordSettings](/type/account.PasswordSettings.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.