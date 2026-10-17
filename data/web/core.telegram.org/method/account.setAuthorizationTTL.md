# account.setAuthorizationTTL

Set time-to-live of current session

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.setAuthorizationTTL#bf899aa0 authorization_ttl_days:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **authorization\_ttl\_days** | [int](/type/int.md) | Time-to-live of current session in days |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | FRESH\_RESET\_AUTHORISATION\_FORBIDDEN | You can't logout other sessions if less than 24 hours have passed since you logged on the current session. |
| 400 | TTL\_DAYS\_INVALID | The provided TTL is invalid. |