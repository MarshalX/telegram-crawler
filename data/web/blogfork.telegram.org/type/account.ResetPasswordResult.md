# account.ResetPasswordResult

Result of an [account.resetPassword](/method/account.resetPassword.md) request.

```tl
account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
account.resetPasswordRequestedWait#e9effc7d until_date:int = account.ResetPasswordResult;
account.resetPasswordOk#e926d63e = account.ResetPasswordResult;

---functions---

account.resetPassword#9308ce1b = account.ResetPasswordResult;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.resetPasswordFailedWait](/constructor/account.resetPasswordFailedWait.md) | You recently requested a password reset that was canceled, please wait until the specified date before requesting another reset. |
| [account.resetPasswordRequestedWait](/constructor/account.resetPasswordRequestedWait.md) | You successfully requested a password reset, please wait until the specified date before finalizing the reset. |
| [account.resetPasswordOk](/constructor/account.resetPasswordOk.md) | The 2FA password was reset successfully. |

### Methods

| Method | Description |
| --- | --- |
| [account.resetPassword](/method/account.resetPassword.md) | Initiate a 2FA password reset: can only be used if the user is already logged-in, [see here for more info »](/api/srp.md#password-reset) |

### Related pages

#### [account.resetPassword](/method/account.resetPassword.md)
Initiate a 2FA password reset: can only be used if the user is already logged-in, [see here for more info »](/api/srp.md#password-reset)