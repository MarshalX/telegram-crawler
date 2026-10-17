# auth.passwordRecovery

Recovery info of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification).

```tl
auth.passwordRecovery#137948a5 email_pattern:string = auth.PasswordRecovery;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **email\_pattern** | [string](/type/string.md) | The email to which the recovery code was sent must match this [pattern](/api/pattern.md). |

### Type
[auth.PasswordRecovery](/type/auth.PasswordRecovery.md)

### Related pages

#### [Pattern matching](/api/pattern.md)
Some methods require the client to verify if the data obtained from an external source matches a certain pattern.

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.