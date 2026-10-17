# account.deleteAccount

Delete the user's account from the telegram servers.

Can also be used to delete the account of a user that provided the login code, but forgot the 2FA password and no recovery method is configured, see [here »](/api/srp.md#password-recovery) for more info on password recovery, and [here »](/api/account-deletion.md) for more info on account deletion.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.deleteAccount#a2c0cf74 flags:# reason:string password:flags.0?InputCheckPasswordSRP = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **reason** | [string](/type/string.md) | Why is the account being deleted, can be empty |
| **password** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputCheckPasswordSRP](/type/InputCheckPasswordSRP.md) | [2FA password](/api/srp.md): this field can be omitted even for accounts with 2FA enabled: in this case account account deletion will be delayed by 7 days [as specified in the docs »](/api/account-deletion.md) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### This method can be invoked over an [unauthenticated connection &raquo;](/api/auth.md)

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 420 | 2FA\_CONFIRM\_WAIT\_%d | Since this account is active and protected by a 2FA password, we will delete it in 1 week for security purposes. You can cancel this process at any time, you'll be able to reset your account in %d seconds. |
| 400 | PASSWORD\_HASH\_INVALID | The provided password hash is invalid. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [Account deletion](/api/account-deletion.md)
How to reset an account if the 2FA password was forgotten.