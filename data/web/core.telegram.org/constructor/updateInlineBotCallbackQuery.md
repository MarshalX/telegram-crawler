# updateInlineBotCallbackQuery

This notification is received by bots when a button is pressed

```tl
updateInlineBotCallbackQuery#691e9052 flags:# query_id:long user_id:long msg_id:InputBotInlineMessageID chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Query ID |
| **user\_id** | [long](/type/long.md) | ID of the user that pressed the button |
| **msg\_id** | [InputBotInlineMessageID](/type/InputBotInlineMessageID.md) | ID of the inline message with the button |
| **chat\_instance** | [long](/type/long.md) | Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field. |
| **game\_short\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Short name of a Game to be returned, serves as the unique identifier for the game |

### Type
[Update](/type/Update.md)