# Messages.BotCallbackAnswer

Callback answer of bot

```tl
messages.botCallbackAnswer#36585ea4 flags:# alert:flags.1?true has_url:flags.3?true native_ui:flags.4?true message:flags.0?string url:flags.2?string cache_time:int = messages.BotCallbackAnswer;

---functions---

messages.getBotCallbackAnswer#9342ca07 flags:# game:flags.1?true peer:InputPeer msg_id:int data:flags.0?bytes password:flags.2?InputCheckPasswordSRP = messages.BotCallbackAnswer;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.botCallbackAnswer](/constructor/messages.botCallbackAnswer.md) | Callback answer sent by the bot in response to a button press |

### Methods

| Method | Description |
| --- | --- |
| [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) | Press an inline callback button and get a callback answer from the bot |