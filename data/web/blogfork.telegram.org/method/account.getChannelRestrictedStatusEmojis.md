# account.getChannelRestrictedStatusEmojis

Returns fetch the full list of [custom emoji IDs »](/api/custom-emoji.md) that cannot be used in [channel emoji statuses »](/api/emoji-status.md).

```tl
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
---functions---
account.getChannelRestrictedStatusEmojis#35a9e0d5 hash:long = EmojiList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[EmojiList](/type/EmojiList.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.