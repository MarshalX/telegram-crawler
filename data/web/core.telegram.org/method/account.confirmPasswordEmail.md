# account.confirmPasswordEmail

Verify an email to use as [2FA recovery method](/api/srp.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.confirmPasswordEmail#8fdf1920 code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **code** | [string](/type/string.md) | The phone code that was received after [setting a recovery email](/api/srp.md#email-verification) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CODE\_INVALID | Code invalid. |
| 400 | EMAIL\_HASH\_EXPIRED | Email hash expired. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.