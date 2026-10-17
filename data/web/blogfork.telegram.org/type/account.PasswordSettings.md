# account.PasswordSettings

Private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on)

```tl
account.passwordSettings#9a5c33e5 flags:# email:flags.0?string secure_settings:flags.1?SecureSecretSettings = account.PasswordSettings;

---functions---

account.getPasswordSettings#9cd4eaf9 password:InputCheckPasswordSRP = account.PasswordSettings;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.passwordSettings](/constructor/account.passwordSettings.md) | Private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on) |

### Methods

| Method | Description |
| --- | --- |
| [account.getPasswordSettings](/method/account.getPasswordSettings.md) | Get private info associated to the password info (recovery email, telegram [passport](/passport.md) info &amp; so on) |

### Related pages

#### [Telegram Passport Manual](/passport.md)
Telegram Passport, a unified authorization method for services that require personal identification.