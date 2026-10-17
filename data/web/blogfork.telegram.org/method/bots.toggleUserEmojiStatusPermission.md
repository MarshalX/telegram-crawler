# bots.toggleUserEmojiStatusPermission

Allow or prevent a bot from [changing our emoji status »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.toggleUserEmojiStatusPermission#6de6392 bot:InputUser enabled:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot |
| **enabled** | [Bool](/type/Bool.md) | Whether to allow or prevent the bot from changing our emoji status |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.