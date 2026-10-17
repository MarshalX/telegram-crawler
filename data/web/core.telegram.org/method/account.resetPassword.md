# account.resetPassword

Initiate a 2FA password reset: can only be used if the user is already logged-in, [see here for more info »](/api/srp.md#password-reset)

```tl
account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
account.resetPasswordRequestedWait#e9effc7d until_date:int = account.ResetPasswordResult;
account.resetPasswordOk#e926d63e = account.ResetPasswordResult;
---functions---
account.resetPassword#9308ce1b = account.ResetPasswordResult;
```

### Parameters

This constructor does not require any parameters.

### Result
[account.ResetPasswordResult](/type/account.ResetPasswordResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PASSWORD\_EMPTY | The provided password is empty. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.