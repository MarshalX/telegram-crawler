# account.toggleUsername

Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to the currently logged-in user.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.toggleUsername#58d6b376 username:string active:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **username** | [string](/type/string.md) | Username |
| **active** | [Bool](/type/Bool.md) | Whether to activate or deactivate it |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USERNAMES\_ACTIVE\_TOO\_MUCH | The maximum number of active usernames was reached. |
| 400 | USERNAME\_INVALID | The provided username is not valid. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |