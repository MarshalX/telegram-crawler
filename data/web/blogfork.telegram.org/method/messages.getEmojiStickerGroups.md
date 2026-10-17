# messages.getEmojiStickerGroups

Represents a list of [emoji categories](/api/emoji-categories.md), to be used when choosing a sticker.

```tl
messages.emojiGroupsNotModified#6fb4ad87 = messages.EmojiGroups;
messages.emojiGroups#881fb94b hash:int groups:Vector<EmojiGroup> = messages.EmojiGroups;
---functions---
messages.getEmojiStickerGroups#1dd840f5 hash:int = messages.EmojiGroups;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.EmojiGroups](/type/messages.EmojiGroups.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.