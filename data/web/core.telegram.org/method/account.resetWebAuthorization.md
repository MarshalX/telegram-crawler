# account.resetWebAuthorization

Log out an active web [telegram login](/widgets/login.md) session

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.resetWebAuthorization#2d01b9ef hash:long = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Session](/constructor/webAuthorization.md) hash |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | HASH\_INVALID | The provided hash is invalid. |

### Related pages

#### [webAuthorization](/constructor/webAuthorization.md)
Represents a bot logged in using the [Telegram login widget](/widgets/login.md)

#### [Telegram Login Widget](/widgets/login.md)