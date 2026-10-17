# account.declinePasswordReset

Abort a pending 2FA password reset, [see here for more info »](/api/srp.md#password-reset)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.declinePasswordReset#4c9409f6 = Bool;
```

### Parameters

This constructor does not require any parameters.

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RESET\_REQUEST\_MISSING | No password reset is in progress. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.