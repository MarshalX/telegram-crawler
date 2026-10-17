# bots.canSendMessage

Check whether the specified bot can send us messages

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.canSendMessage#1359f4e6 bot:InputUser = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |