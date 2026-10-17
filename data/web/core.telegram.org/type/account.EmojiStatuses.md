# account.EmojiStatuses

A list of [emoji statuses](/api/emoji-status.md)

```tl
account.emojiStatusesNotModified#d08ce645 = account.EmojiStatuses;
account.emojiStatuses#90c467d1 hash:long statuses:Vector<EmojiStatus> = account.EmojiStatuses;

---functions---

account.getDefaultEmojiStatuses#d6753386 hash:long = account.EmojiStatuses;
account.getRecentEmojiStatuses#f578105 hash:long = account.EmojiStatuses;
account.getChannelDefaultEmojiStatuses#7727a7d5 hash:long = account.EmojiStatuses;
account.getCollectibleEmojiStatuses#2e7b4543 hash:long = account.EmojiStatuses;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.emojiStatusesNotModified](/constructor/account.emojiStatusesNotModified.md) | The server-side list of [emoji statuses](/api/emoji-status.md) hasn't changed |
| [account.emojiStatuses](/constructor/account.emojiStatuses.md) | A list of [emoji statuses](/api/emoji-status.md) |

### Methods

| Method | Description |
| --- | --- |
| [account.getDefaultEmojiStatuses](/method/account.getDefaultEmojiStatuses.md) | Get a list of default suggested [emoji statuses](/api/emoji-status.md) |
| [account.getRecentEmojiStatuses](/method/account.getRecentEmojiStatuses.md) | Get recently used [emoji statuses](/api/emoji-status.md) |
| [account.getChannelDefaultEmojiStatuses](/method/account.getChannelDefaultEmojiStatuses.md) | Get a list of default suggested [channel emoji statuses](/api/emoji-status.md). |
| [account.getCollectibleEmojiStatuses](/method/account.getCollectibleEmojiStatuses.md) | Obtain a list of [emoji statuses »](/api/emoji-status.md) for owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts). |

### Related pages

#### [Emoji status](/api/emoji-status.md)
Telegram allows users to set an emoticon or a custom emoji as status, to show next to their name in chats and profiles.