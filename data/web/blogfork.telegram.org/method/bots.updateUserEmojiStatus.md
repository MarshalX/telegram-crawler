# bots.updateUserEmojiStatus

Change the emoji status of a user (invoked by bots, see [here »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot) for more info on the full flow)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.updateUserEmojiStatus#ed9f30c5 user_id:InputUser emoji_status:EmojiStatus = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | The user whose emoji status should be changed |
| **emoji\_status** | [EmojiStatus](/type/EmojiStatus.md) | The emoji status |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 403 | USER\_PERMISSION\_DENIED | The user hasn't granted or has revoked the bot's access to change their emoji status using [bots.toggleUserEmojiStatusPermission](/method/bots.toggleUserEmojiStatusPermission.md). |

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [bots.toggleUserEmojiStatusPermission](/method/bots.toggleUserEmojiStatusPermission.md)
Allow or prevent a bot from [changing our emoji status »](/api/emoji-status.md#setting-an-emoji-status-from-a-bot)