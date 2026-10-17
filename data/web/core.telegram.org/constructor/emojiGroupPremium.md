# emojiGroupPremium

An [emoji category](/api/emoji-categories.md), used to select all [Premium](/api/premium.md)-only stickers (i.e. those with a [Premium effect »](/api/stickers.md#premium-animated-sticker-effects))/[Premium](/api/premium.md)-only [custom emojis](/api/custom-emoji.md) (i.e. those where the [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md).`free` flag is **not** set)

```tl
emojiGroupPremium#93bcf34 title:string icon_emoji_id:long = EmojiGroup;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **title** | [string](/type/string.md) | Category name, i.e. "Animals", "Flags", "Faces" and so on... |
| **icon\_emoji\_id** | [long](/type/long.md) | A single custom emoji used as preview for the category. |

### Type
[EmojiGroup](/type/EmojiGroup.md)

### Related pages

#### [Emoji categories](/api/emoji-categories.md)
Sticker, custom emoji and GIF selection UIs should offer a list of categories to quickly filter results by a (list of) emojis, or by some other criteria.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md)
Info about a custom emoji