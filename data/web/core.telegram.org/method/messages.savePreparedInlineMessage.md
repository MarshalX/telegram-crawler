# messages.savePreparedInlineMessage

Save a [prepared inline message](/api/bots/inline.md#21-using-a-prepared-inline-message), to be shared by the user of the mini app using a [web\_app\_send\_prepared\_message event](/api/web-events.md#web-app-send-prepared-message)

```tl
messages.botPreparedInlineMessage#8ecf0511 id:string expire_date:int = messages.BotPreparedInlineMessage;
---functions---
messages.savePreparedInlineMessage#f21f7f2f flags:# result:InputBotInlineResult user_id:InputUser peer_types:flags.0?Vector<InlineQueryPeerType> = messages.BotPreparedInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **result** | [InputBotInlineResult](/type/InputBotInlineResult.md) | The message |
| **user\_id** | [InputUser](/type/InputUser.md) | The user to whom the [web\_app\_send\_prepared\_message event](/api/web-events.md#web-app-send-prepared-message) event will be sent |
| **peer\_types** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[InlineQueryPeerType](/type/InlineQueryPeerType.md)&gt; | Types of chats where this message can be sent |

### Result
[messages.BotPreparedInlineMessage](/type/messages.BotPreparedInlineMessage.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | RESULT\_ID\_INVALID | One of the specified result IDs is invalid. |
| 400 | SEND\_MESSAGE\_GAME\_INVALID | An inputBotInlineMessageGame can only be contained in an inputBotInlineResultGame, not in an inputBotInlineResult/inputBotInlineResultPhoto/etc. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages

#### [Inline queries](/api/bots/inline.md)
Users can interact with your bot via inline queries, straight from the text input field in any chat.