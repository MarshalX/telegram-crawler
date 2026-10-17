# account.checkUsername

Validates a username and checks availability.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.checkUsername#2714d86c username:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **username** | [string](/type/string.md) | username\
Accepted characters: A-z (case-insensitive), 0-9 and underscores.\
Length: 5-32 characters. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_OCCUPIED | The provided username is already occupied. |
| 400 | USERNAME\_PURCHASE\_AVAILABLE | The specified username can be purchased on https://fragment.com. |