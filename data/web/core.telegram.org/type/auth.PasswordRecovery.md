# auth.PasswordRecovery

Recovery info of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification).

```tl
auth.passwordRecovery#137948a5 email_pattern:string = auth.PasswordRecovery;

---functions---

auth.requestPasswordRecovery#d897bc66 = auth.PasswordRecovery;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [auth.passwordRecovery](/constructor/auth.passwordRecovery.md) | Recovery info of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification). |

### Methods

| Method | Description |
| --- | --- |
| [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md) | Request recovery code of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification). |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.