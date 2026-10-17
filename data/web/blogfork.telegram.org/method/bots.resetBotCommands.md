# bots.resetBotCommands

Clear bot commands for the specified bot scope and language code

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.resetBotCommands#3d8de0f9 scope:BotCommandScope lang_code:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **scope** | [BotCommandScope](/type/BotCommandScope.md) | Command scope |
| **lang\_code** | [string](/type/string.md) | Language code |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LANG\_CODE\_INVALID | The specified language code is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |