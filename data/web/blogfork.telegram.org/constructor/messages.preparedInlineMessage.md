# messages.preparedInlineMessage

Represents a [prepared inline message received via a bot's mini app, that can be sent to some chats »](/api/bots/inline.md#21-using-a-prepared-inline-message)

```tl
messages.preparedInlineMessage#ff57708d query_id:long result:BotInlineResult peer_types:Vector<InlineQueryPeerType> cache_time:int users:Vector<User> = messages.PreparedInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query\_id** | [long](/type/long.md) | The `query_id` to pass to [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md) |
| **result** | [BotInlineResult](/type/BotInlineResult.md) | The contents of the message, to be shown in a preview |
| **peer\_types** | [Vector](/type/Vector%20t)&lt;[InlineQueryPeerType](/type/InlineQueryPeerType.md)&gt; | Types of chats where this message can be sent |
| **cache\_time** | [int](/type/int.md) | Caching validity of the results |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in the results |

### Type
[messages.PreparedInlineMessage](/type/messages.PreparedInlineMessage.md)

### Related pages

#### [messages.sendInlineBotResult](/method/messages.sendInlineBotResult.md)
Send a result obtained using [messages.getInlineBotResults](/method/messages.getInlineBotResults.md).

#### [Inline queries](/api/bots/inline.md)
Users can interact with your bot via inline queries, straight from the text input field in any chat.