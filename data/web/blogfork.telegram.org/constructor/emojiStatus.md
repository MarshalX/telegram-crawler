# emojiStatus

An [emoji status](/api/emoji-status.md)

```tl
emojiStatus#e7ff068a flags:# document_id:long until:flags.0?int = EmojiStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **document\_id** | [long](/type/long.md) | [Custom emoji document ID](/api/custom-emoji.md) |
| **until** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, the emoji status will be active until the specified unixtime. |

### Type
[EmojiStatus](/type/EmojiStatus.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.