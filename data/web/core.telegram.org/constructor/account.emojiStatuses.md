# account.emojiStatuses

A list of [emoji statuses](/api/emoji-status.md)

```tl
account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **statuses** | [Vector](/type/Vector%20t)&lt;[EmojiStatus](/type/EmojiStatus.md)&gt; | [Emoji statuses](/api/emoji-status.md) |

### Type
[account.EmojiStatuses](/type/account.EmojiStatuses.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.