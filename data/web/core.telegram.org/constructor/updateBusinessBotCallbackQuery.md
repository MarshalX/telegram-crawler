# updateBusinessBotCallbackQuery

A callback button sent via a [business connection](/api/bots/connected-business-bots.md) was pressed, and the button data was sent to the bot that created the button.

```tl
updateBusinessBotCallbackQuery#1ea2fda7 flags:# query_id:long user_id:long connection_id:string message:Message reply_to_message:flags.2?Message chat_instance:long data:flags.0?bytes = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Query ID |
| **user\_id** | [long](/type/long.md) | ID of the user that pressed the button |
| **connection\_id** | [string](/type/string.md) | [Business connection ID](/api/bots/connected-business-bots.md) |
| **message** | [Message](/type/Message.md) | Message that contains the keyboard (also contains info about the chat where the message was sent). |
| **reply\_to\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Message](/type/Message.md) | The message that `message` is replying to. |
| **chat\_instance** | [long](/type/long.md) | Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. |
| **data** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Callback data |

### Type
[Update](/type/Update.md)

### Related pages

#### [Connected business bots](/api/bots/connected-business-bots.md)
Users can connect Telegram bots that will process and answer messages on their behalf. This allows them to seamlessly integrate any existing tools and workflows, or add AI assistants that manage their chats.