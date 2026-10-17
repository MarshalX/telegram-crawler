# emojiGroupGreeting

Represents an [emoji category](/api/emoji-categories.md), that should be moved to the top of the list when choosing a sticker for a [business introduction](/api/business.md#business-introduction)

```tl
emojiGroupGreeting#80d26cc7 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
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

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.