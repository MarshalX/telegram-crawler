# account.password

Configuration for two-factor authorization

```tl
account.password#957b50fb flags:# has_recovery:flags.0?true has_secure_values:flags.1?true has_password:flags.2?true current_algo:flags.2?PasswordKdfAlgo srp_B:flags.2?bytes srp_id:flags.2?long hint:flags.3?string email_unconfirmed_pattern:flags.4?string new_algo:PasswordKdfAlgo new_secure_algo:SecurePasswordKdfAlgo secure_random:bytes pending_reset_date:flags.5?int login_email_pattern:flags.6?string = account.Password;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_recovery** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the user has a recovery method configured |
| **has\_secure\_values** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether telegram [passport](/passport.md) is enabled |
| **has\_password** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the user has a password |
| **current\_algo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[PasswordKdfAlgo](/type/PasswordKdfAlgo.md) | The [KDF algorithm for SRP two-factor authentication](/api/srp.md) of the current password |
| **srp\_B** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[bytes](/type/bytes.md) | Srp B param for [SRP authorization](/api/srp.md) |
| **srp\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | Srp ID param for [SRP authorization](/api/srp.md) |
| **hint** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Text hint for the password |
| **email\_unconfirmed\_pattern** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | A [password recovery email](/api/srp.md#email-verification) with the specified [pattern](/api/pattern.md) is still awaiting verification |
| **new\_algo** | [PasswordKdfAlgo](/type/PasswordKdfAlgo.md) | The [KDF algorithm for SRP two-factor authentication](/api/srp.md) to use when creating new passwords |
| **new\_secure\_algo** | [SecurePasswordKdfAlgo](/type/SecurePasswordKdfAlgo.md) | The KDF algorithm for telegram [passport](/passport.md) |
| **secure\_random** | [bytes](/type/bytes.md) | Secure random string |
| **pending\_reset\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | The 2FA password will be automatically removed at this date, unless the user cancels the operation |
| **login\_email\_pattern** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[string](/type/string.md) | A verified login email with the specified [pattern](/api/pattern.md) is configured |

### Type
[account.Password](/type/account.Password.md)

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Pattern matching](/api/pattern.md)
Some methods require the client to verify if the data obtained from an external source matches a certain pattern.