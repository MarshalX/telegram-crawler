# account.setAccountTTL

Set account self-destruction period

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.setAccountTTL#2442485e ttl:AccountDaysTTL = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **ttl** | [AccountDaysTTL](/type/AccountDaysTTL.md) | Time to live in days |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TTL\_DAYS\_INVALID | The provided TTL is invalid. |