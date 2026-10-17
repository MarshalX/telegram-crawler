# messages.EmojiGroups

Represents a list of [emoji categories](/api/emoji-categories.md).

```tl
messages.emojiGroupsNotModified#6fb4ad87 = messages.EmojiGroups;
messages.emojiGroups#881fb94b hash:int groups:Vector<EmojiGroup> = messages.EmojiGroups;

---functions---

messages.getEmojiGroups#7488ce5b hash:int = messages.EmojiGroups;
messages.getEmojiStatusGroups#2ecd56cd hash:int = messages.EmojiGroups;
messages.getEmojiProfilePhotoGroups#21a548f3 hash:int = messages.EmojiGroups;
messages.getEmojiStickerGroups#1dd840f5 hash:int = messages.EmojiGroups;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.emojiGroupsNotModified](/constructor/messages.emojiGroupsNotModified.md) | The list of [emoji categories](/api/emoji-categories.md) hasn't changed. |
| [messages.emojiGroups](/constructor/messages.emojiGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md). |

### Methods

| Method | Description |
| --- | --- |
| [messages.getEmojiGroups](/method/messages.getEmojiGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md). |
| [messages.getEmojiStatusGroups](/method/messages.getEmojiStatusGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when selecting custom emojis to set as [custom emoji status](/api.md). |
| [messages.getEmojiProfilePhotoGroups](/method/messages.getEmojiProfilePhotoGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when selecting custom emojis to set as [profile picture](/api/files.md#sticker-profile-pictures). |
| [messages.getEmojiStickerGroups](/method/messages.getEmojiStickerGroups.md) | Represents a list of [emoji categories](/api/emoji-categories.md), to be used when choosing a sticker. |

### Related pages

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.