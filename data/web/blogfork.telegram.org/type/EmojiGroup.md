# EmojiGroup

Represents an [emoji category](/api/emoji-categories.md).

```tl
emojiGroup#7a9abda9 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupGreeting#80d26cc7 title:string icon_emoji_id:long emoticons:Vector<string> = EmojiGroup;
emojiGroupPremium#93bcf34 title:string icon_emoji_id:long = EmojiGroup;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [emojiGroup](/constructor/emojiGroup.md) | Represents an [emoji category](/api/emoji-categories.md). |
| [emojiGroupGreeting](/constructor/emojiGroupGreeting.md) | Represents an [emoji category](/api/emoji-categories.md), that should be moved to the top of the list when choosing a sticker for a [business introduction](/api/business.md#business-introduction) |
| [emojiGroupPremium](/constructor/emojiGroupPremium.md) | An [emoji category](/api/emoji-categories.md), used to select all [Premium](/api/premium.md)-only stickers (i.e. those with a [Premium effect »](/api/stickers.md#premium-animated-sticker-effects))/[Premium](/api/premium.md)-only [custom emojis](/api/custom-emoji.md) (i.e. those where the [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md).`free` flag is **not** set) |

### Related pages

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.