# emojiList

Represents a list of [custom emojis](/api/custom-emoji.md).

```tl
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **document\_id** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Custom emoji IDs |

### Type
[EmojiList](/type/EmojiList.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.