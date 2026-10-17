# account.resetPasswordFailedWait

You recently requested a password reset that was canceled, please wait until the specified date before requesting another reset.

```tl
account.resetPasswordFailedWait#e3779861 retry_date:int = account.ResetPasswordResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **retry\_date** | [int](/type/int.md) | Wait until this date before requesting another reset. |

### Type
[account.ResetPasswordResult](/type/account.ResetPasswordResult.md)