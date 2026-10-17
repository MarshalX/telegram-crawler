# account.resetAuthorization

Log out an active [authorized session](/api/auth.md) by its hash

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.resetAuthorization#df77f3bc hash:long = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Session hash |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | FRESH\_RESET\_AUTHORISATION\_FORBIDDEN | You can't logout other sessions if less than 24 hours have passed since you logged on the current session. |
| 400 | HASH\_INVALID | The provided hash is invalid. |

### Related pages

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.