# account.updateEmojiStatus

Set an [emoji status](/api/emoji-status.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.updateEmojiStatus#fbd3de6b emoji_status:EmojiStatus = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **emoji\_status** | [EmojiStatus](/type/EmojiStatus.md) | [Emoji status](/api/emoji-status.md) to set |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | COLLECTIBLE\_INVALID | The specified collectible is invalid. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.