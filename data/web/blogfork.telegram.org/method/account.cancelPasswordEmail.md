# account.cancelPasswordEmail

Cancel the code that was sent to verify an email to use as [2FA recovery method](/api/srp.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.cancelPasswordEmail#c1cbd5b6 = Bool;
```

### Parameters

This constructor does not require any parameters.

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMAIL\_HASH\_EXPIRED | Email hash expired. |

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.