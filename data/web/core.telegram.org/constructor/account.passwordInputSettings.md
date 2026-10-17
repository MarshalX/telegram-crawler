# account.passwordInputSettings

Settings for setting up a new password

```tl
account.passwordInputSettings#c23727c9 flags:# new_algo:flags.0?PasswordKdfAlgo new_password_hash:flags.0?bytes hint:flags.0?string email:flags.1?string new_secure_settings:flags.2?SecureSecretSettings = account.PasswordInputSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **new\_algo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[PasswordKdfAlgo](/type/PasswordKdfAlgo.md) | The [SRP algorithm](/api/srp.md) to use |
| **new\_password\_hash** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | The [computed password hash](/api/srp.md) |
| **hint** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Text hint for the password |
| **email** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Password recovery email |
| **new\_secure\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[SecureSecretSettings](/type/SecureSecretSettings.md) | Telegram [passport](/passport.md) settings |

### Type
[account.PasswordInputSettings](/type/account.PasswordInputSettings.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.