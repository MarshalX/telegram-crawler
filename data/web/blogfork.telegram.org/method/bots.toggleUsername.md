# bots.toggleUsername

Activate or deactivate a purchased [fragment.com](https://fragment.com) username associated to a bot we own.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.toggleUsername#53ca973 bot:InputUser username:string active:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot |
| **username** | [string](/type/string.md) | Username |
| **active** | [Bool](/type/Bool.md) | Whether to activate or deactivate it |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |