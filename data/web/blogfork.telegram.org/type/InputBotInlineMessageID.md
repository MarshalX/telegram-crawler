# InputBotInlineMessageID

Represents a sent inline message from the perspective of a bot

```tl
inputBotInlineMessageID#890c3d89 dc_id:int id:long access_hash:long = InputBotInlineMessageID;
inputBotInlineMessageID64#b6d915d7 dc_id:int owner_id:long id:int access_hash:long = InputBotInlineMessageID;

---functions---

messages.setBotGuestChatResult#b8f106e3 query_id:long result:InputBotInlineResult = InputBotInlineMessageID;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputBotInlineMessageID](/constructor/inputBotInlineMessageID.md) | Represents a sent inline message from the perspective of a bot (legacy constructor) |
| [inputBotInlineMessageID64](/constructor/inputBotInlineMessageID64.md) | Represents a sent inline message from the perspective of a bot |

### Methods

| Method | Description |
| --- | --- |
| [messages.setBotGuestChatResult](/method/messages.setBotGuestChatResult.md) | Bots may use this method to answer a [guest mode »](/api/bots/guest-mode.md) query received via an [updateBotGuestChatQuery](/constructor/updateBotGuestChatQuery.md) update, providing the message to post into the chat as a guest, see [here »](/api/bots/guest-mode.md#handling-guest-queries-bot-side) for more info. |