# auth.recoverPassword

Reset the [2FA password](/api/srp.md) using the recovery code sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md).

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.recoverPassword#37096c70 flags:# code:string new_settings:flags.0?account.PasswordInputSettings = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **code** | [string](/type/string.md) | Code received via email |
| **new\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[account.PasswordInputSettings](/type/account.PasswordInputSettings.md) | New password |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CODE\_EMPTY | The provided code is empty. |
| 400 | NEW\_SETTINGS\_INVALID | The new password settings are invalid. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md)
Request recovery code of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification).