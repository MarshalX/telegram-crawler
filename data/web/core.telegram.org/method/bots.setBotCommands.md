# bots.setBotCommands

Set bot command list

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.setBotCommands#517165a scope:BotCommandScope lang_code:string commands:Vector<BotCommand> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **scope** | [BotCommandScope](/type/BotCommandScope.md) | Command scope |
| **lang\_code** | [string](/type/string.md) | Language code |
| **commands** | [Vector](/type/Vector%20t)&lt;[BotCommand](/type/BotCommand.md)&gt; | Bot commands |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_COMMAND\_DESCRIPTION\_INVALID | The specified command description is invalid. |
| 400 | BOT\_COMMAND\_INVALID | The specified command is invalid. |
| 400 | LANG\_CODE\_INVALID | The specified language code is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |