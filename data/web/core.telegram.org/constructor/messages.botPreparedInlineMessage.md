# messages.botPreparedInlineMessage

Represents a [prepared inline message saved by a bot, to be sent to the user via a web app »](/api/bots/inline.md#21-using-a-prepared-inline-message)

```tl
messages.botPreparedInlineMessage#8ecf0511 id:string expire_date:int = messages.BotPreparedInlineMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [string](/type/string.md) | The ID of the saved message, to be passed to the `id` field of the [web\_app\_send\_prepared\_message event »](/api/web-events.md#web-app-send-prepared-message) |
| **expire\_date** | [int](/type/int.md) | Expiration date of the message |

### Type
[messages.BotPreparedInlineMessage](/type/messages.BotPreparedInlineMessage.md)

### Related pages

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages

#### [Inline queries](/api/bots/inline.md)
Users can interact with your bot via inline queries, straight from the text input field in any chat.