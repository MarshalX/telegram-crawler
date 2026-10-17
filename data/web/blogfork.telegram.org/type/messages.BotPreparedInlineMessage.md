# Messages.BotPreparedInlineMessage

Represents a [prepared inline message saved by a bot, to be sent to the user via a web app »](/api/bots/inline.md#21-using-a-prepared-inline-message)

```tl
messages.botPreparedInlineMessage#8ecf0511 id:string expire_date:int = messages.BotPreparedInlineMessage;

---functions---

messages.savePreparedInlineMessage#f21f7f2f flags:# result:InputBotInlineResult user_id:InputUser peer_types:flags.0?Vector<InlineQueryPeerType> = messages.BotPreparedInlineMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.botPreparedInlineMessage](/constructor/messages.botPreparedInlineMessage.md) | Represents a [prepared inline message saved by a bot, to be sent to the user via a web app »](/api/bots/inline.md#21-using-a-prepared-inline-message) |

### Methods

| Method | Description |
| --- | --- |
| [messages.savePreparedInlineMessage](/method/messages.savePreparedInlineMessage.md) | Save a [prepared inline message](/api/bots/inline.md#21-using-a-prepared-inline-message), to be shared by the user of the mini app using a [web\_app\_send\_prepared\_message event](/api/web-events.md#web-app-send-prepared-message) |

### Related pages

#### [Inline queries](/api/bots/inline.md)
Users can interact with your bot via inline queries, straight from the text input field in any chat.