# messages.setInlineGameScore

Use this method to set the score of the specified user in a game sent as an inline message (bots only).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setInlineGameScore#15ad9f64 flags:# edit_message:flags.0?true force:flags.1?true id:InputBotInlineMessageID user_id:InputUser score:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **edit\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag if the game message should be automatically edited to include the current scoreboard |
| **force** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters |
| **id** | [InputBotInlineMessageID](/type/InputBotInlineMessageID.md) | ID of the inline message |
| **user\_id** | [InputUser](/type/InputUser.md) | User identifier |
| **score** | [int](/type/int.md) | New score |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |