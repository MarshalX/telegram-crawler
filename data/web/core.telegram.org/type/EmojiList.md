# EmojiList

Represents a list of [custom emojis](/api/custom-emoji.md).

```tl
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;

---functions---

account.getDefaultProfilePhotoEmojis#e2750328 hash:long = EmojiList;
account.getDefaultGroupPhotoEmojis#915860ae hash:long = EmojiList;
messages.searchCustomEmoji#2c11c0d7 emoticon:string hash:long = EmojiList;
account.getDefaultBackgroundEmojis#a60ab9ce hash:long = EmojiList;
account.getChannelRestrictedStatusEmojis#35a9e0d5 hash:long = EmojiList;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [emojiListNotModified](/constructor/emojiListNotModified.md) | The list of [custom emojis](/api/custom-emoji.md) hasn't changed. |
| [emojiList](/constructor/emojiList.md) | Represents a list of [custom emojis](/api/custom-emoji.md). |

### Methods

| Method | Description |
| --- | --- |
| [account.getDefaultProfilePhotoEmojis](/method/account.getDefaultProfilePhotoEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be [used as profile picture](/api/files.md#sticker-profile-pictures) |
| [account.getDefaultGroupPhotoEmojis](/method/account.getDefaultGroupPhotoEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be [used as group picture](/api/files.md#sticker-profile-pictures) |
| [account.getDefaultBackgroundEmojis](/method/account.getDefaultBackgroundEmojis.md) | Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be used in an [accent color pattern](/api/colors.md). |
| [account.getChannelRestrictedStatusEmojis](/method/account.getChannelRestrictedStatusEmojis.md) | Returns fetch the full list of [custom emoji IDs »](/api/custom-emoji.md) that cannot be used in [channel emoji statuses »](/api/emoji-status.md). |
| [messages.searchCustomEmoji](/method/messages.searchCustomEmoji.md) | Look for [custom emojis](/api/custom-emoji.md) associated to a UTF8 emoji |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.