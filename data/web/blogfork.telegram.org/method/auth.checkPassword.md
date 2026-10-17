# auth.checkPassword

Try logging to an account protected by a [2FA password](/api/srp.md).

```tl
auth.authorization#2ea2c0d4 flags:# setup_password_required:flags.1?true otherwise_relogin_days:flags.1?int tmp_sessions:flags.0?int future_auth_token:flags.2?bytes user:User = auth.Authorization;
auth.authorizationSignUpRequired#44747e9a flags:# terms_of_service:flags.0?help.TermsOfService = auth.Authorization;
---functions---
auth.checkPassword#d18b4d16 password:InputCheckPasswordSRP = auth.Authorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **password** | [InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | The account's password (see [SRP](/api/srp.md)) |

### Result
[auth.Authorization](/type/auth.Authorization.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 500 | AUTH\_KEY\_UNSYNCHRONIZED | Internal error, please repeat the method call. |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |
| 400 | SRP\_ID\_INVALID | Invalid SRP ID provided. |
| 400 | SRP\_PASSWORD\_CHANGED | Password has changed. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.