# account.getDefaultProfilePhotoEmojis

Get a set of suggested [custom emoji stickers](/api/custom-emoji.md) that can be [used as profile picture](/api/files.md#sticker-profile-pictures)

```tl
emojiListNotModified#481eadfa = EmojiList;
emojiList#7a1e11d1 hash:long document_id:Vector<long> = EmojiList;
---functions---
account.getDefaultProfilePhotoEmojis#e2750328 hash:long = EmojiList;
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

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.