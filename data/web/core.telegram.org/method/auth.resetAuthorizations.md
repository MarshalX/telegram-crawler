# auth.resetAuthorizations

Terminates all user's authorized sessions except for the current one.

After calling this method it is necessary to reregister the current device using the method [account.registerDevice](/method/account.registerDevice.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
auth.resetAuthorizations#9fab0d1a = Bool;
```

### Parameters

This constructor does not require any parameters.

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | FRESH\_RESET\_AUTHORISATION\_FORBIDDEN | You can't logout other sessions if less than 24 hours have passed since you logged on the current session. |

### Related pages

#### [account.registerDevice](/method/account.registerDevice.md)
Register device to receive [PUSH notifications](/api/push-updates.md)