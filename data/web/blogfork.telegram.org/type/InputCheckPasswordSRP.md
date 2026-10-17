# InputCheckPasswordSRP

Constructors for checking the validity of a [2FA SRP password](/api/srp.md).

See [here »](/api/srp.md#using-the-2fa-password) for more info on the 2FA authentication flow for methods that require it, before and after login.

```tl
inputCheckPasswordEmpty#9880f658 = InputCheckPasswordSRP;
inputCheckPasswordSRP#d27ff082 srp_id:long A:bytes M1:bytes = InputCheckPasswordSRP;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputCheckPasswordEmpty](/constructor/inputCheckPasswordEmpty.md) | There is no password |
| [inputCheckPasswordSRP](/constructor/inputCheckPasswordSRP.md) | Constructor for checking the validity of a 2FA SRP password (see [SRP](/api/srp.md)) |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.