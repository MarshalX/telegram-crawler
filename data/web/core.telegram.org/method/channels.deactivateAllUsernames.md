# channels.deactivateAllUsernames

Disable all purchased usernames of a supergroup or channel

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.deactivateAllUsernames#a245dd3 channel:InputChannel = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Supergroup or channel |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |