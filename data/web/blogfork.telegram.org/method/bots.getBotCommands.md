# bots.getBotCommands

Obtain a list of bot commands for the specified bot scope and language code

```tl
---functions---
bots.getBotCommands#e34c0dd6 scope:BotCommandScope lang_code:string = Vector<BotCommand>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **scope** | [BotCommandScope](/type/BotCommandScope.md) | Command scope |
| **lang\_code** | [string](/type/string.md) | Language code |

### Result
[Vector](/type/Vector%20t)&lt;[BotCommand](/type/BotCommand.md)&gt;

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |