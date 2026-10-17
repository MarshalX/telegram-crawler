# updateUserEmojiStatus

The [emoji status](/api/emoji-status.md) of a certain user has changed

```tl
updateUserEmojiStatus#28373599 user_id:long emoji_status:EmojiStatus = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [long](/type/long.md) | User ID |
| **emoji\_status** | [EmojiStatus](/type/EmojiStatus.md) | New [emoji status](/api/emoji-status.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.