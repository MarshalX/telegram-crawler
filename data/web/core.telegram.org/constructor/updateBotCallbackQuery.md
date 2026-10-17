# updateBotCallbackQuery

A callback button was pressed, and the button data was sent to the bot that created the button

```tl
updateBotCallbackQuery#b9cfc48d flags:# query_id:long user_id:long peer:Peer msg_id:int chat_instance:long data:flags.0?bytes game_short_name:flags.1?string = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Query ID |
| **user\_id** | [long](/type/long.md) | ID of the user that pressed the button |
| **peer** | [Peer](/type/Peer.md) | Chat where the inline keyboard was sent |
| **msg\_id** | [int](/type/int.md) | Message ID |
| **chat\_instance** | [long](/type/long.md) | Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Callback data |
| **game\_short\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Short name of a Game to be returned, serves as the unique identifier for the game |

### Type
[Update](/type/Update.md)