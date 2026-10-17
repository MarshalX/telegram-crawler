# emojiGroup

Represents an [emoji category](/api/emoji-categories.md).

```tl
emojiGroup#7a9abda9 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **title** | [string](/type/string.md) | Category name, i.e. "Animals", "Flags", "Faces" and so on... |
| **icon\_emoji\_id** | [long](/type/long.md) | A single custom emoji used as preview for the category. |
| **emoticons** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | A list of UTF-8 emojis, matching the category. |

### Type
[EmojiGroup](/type/EmojiGroup.md)

### Related pages

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.