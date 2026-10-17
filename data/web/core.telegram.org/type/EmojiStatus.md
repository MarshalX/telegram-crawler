# EmojiStatus

[Emoji status](/api/emoji-status.md)

```tl
emojiStatusEmpty#2de11aae = EmojiStatus;
emojiStatus#e7ff068a flags:# document_id:long until:flags.0?int = EmojiStatus;
emojiStatusCollectible#7184603b flags:# collectible_id:long document_id:long title:string slug:string pattern_document_id:long center_color:int edge_color:int pattern_color:int text_color:int until:flags.0?int = EmojiStatus;
inputEmojiStatusCollectible#7141dbf flags:# collectible_id:long until:flags.0?int = EmojiStatus;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [emojiStatusEmpty](/constructor/emojiStatusEmpty.md) | No emoji status is set |
| [emojiStatus](/constructor/emojiStatus.md) | An [emoji status](/api/emoji-status.md) |
| [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) | An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status.\
\
**Cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first before passing it to that method. |
| [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) | An owned or [hosted collectible gift »](/api/gifts.md#hosted-collectible-gifts) as emoji status: can only be used in [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), is never returned by the API.\
\
Note that once set, the status will be returned to users as a [emojiStatusCollectible](/constructor/emojiStatusCollectible.md) constructor, instead (which **cannot** be passed to [account.updateEmojiStatus](/method/account.updateEmojiStatus.md), and must be converted to an [inputEmojiStatusCollectible](/constructor/inputEmojiStatusCollectible.md) first). |

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.