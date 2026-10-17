# account.getCollectibleEmojiStatuses

Obtain a list of [emoji statuses »](/api/emoji-status.md) for owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts).

```tl
account.emojiStatusesNotModified#d08ce645 = account.EmojiStatuses;
account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;
---functions---
account.getCollectibleEmojiStatuses#2e7b4543 hash:long = account.EmojiStatuses;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash for pagination](/api/offsets.md) |

### Result
[account.EmojiStatuses](/type/account.EmojiStatuses.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.