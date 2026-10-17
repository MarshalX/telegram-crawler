# account.PasswordInputSettings

Constructor for setting up a new [2FA SRP password](/api/srp.md)

```tl
account.passwordInputSettings#c23727c9 flags:# new_algo:flags.0?PasswordKdfAlgo new_password_hash:flags.0?bytes hint:flags.0?string email:flags.1?string new_secure_settings:flags.2?SecureSecretSettings = account.PasswordInputSettings;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.passwordInputSettings](/constructor/account.passwordInputSettings.md) | Settings for setting up a new password |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.