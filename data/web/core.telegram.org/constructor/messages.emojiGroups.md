# messages.emojiGroups

Represents a list of [emoji categories](/api/emoji-categories.md).

```tl
messages.emojiGroups#881fb94b hash:int groups:Vector<EmojiGroup> = messages.EmojiGroups;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [int](/type/int.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **groups** | [Vector](/type/Vector%20t)&lt;[EmojiGroup](/type/EmojiGroup.md)&gt; | A list of [emoji categories](/api/emoji-categories.md). |

### Type
[messages.EmojiGroups](/type/messages.EmojiGroups.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.