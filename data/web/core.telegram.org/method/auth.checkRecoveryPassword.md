# auth.checkRecoveryPassword

Check if the [2FA recovery code](/api/srp.md) sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md) is valid, before passing it to [auth.recoverPassword](/method/auth.recoverPassword.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.checkRecoveryPassword#d36bf79 code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **code** | [string](/type/string.md) | Code received via email |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CODE\_EMPTY | The provided code is empty. |
| 400 | PASSWORD\_RECOVERY\_EXPIRED | The recovery code has expired. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md)
Request recovery code of a [2FA password](/api/srp.md), only for accounts with a [recovery email configured](/api/srp.md#email-verification).

#### [auth.recoverPassword](/method/auth.recoverPassword.md)
Reset the [2FA password](/api/srp.md) using the recovery code sent using [auth.requestPasswordRecovery](/method/auth.requestPasswordRecovery.md).