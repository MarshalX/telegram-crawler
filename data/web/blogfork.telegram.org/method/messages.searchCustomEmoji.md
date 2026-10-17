# messages.searchCustomEmoji

Look for [custom emojis](/api/custom-emoji.md) associated to a UTF8 emoji

```tl
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
---functions---
messages.searchCustomEmoji#2c11c0d7 emoticon:string hash:long = EmojiList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **emoticon** | [string](/type/string.md) | The emoji |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[EmojiList](/type/EmojiList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMOTICON\_EMPTY | The emoji is empty. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.