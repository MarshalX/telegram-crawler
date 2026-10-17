# account.getUniqueGiftChatThemes

Obtain all [chat themes »](/api/themes.md#chat-themes) associated to owned or [hosted collectible gifts »](/api/gifts.md#hosted-collectible-gifts).

```tl
account.chatThemesNotModified#e011e1c4 = account.ChatThemes;
account.chatThemes#be098173 flags:# hash:long themes:Vector<ChatTheme> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = account.ChatThemes;
---functions---
account.getUniqueGiftChatThemes#e42ce9c9 offset:string limit:int hash:long = account.ChatThemes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [string](/type/string.md) | Offset for [pagination](/api/offsets.md), intially an empty string, then equal the value of the last returned [account.chatThemes](/constructor/account.chatThemes.md).`next_offset` (if set). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md). Note that the server may return less than `limit` results, even if the actual number of remaining results is `>= limit`, paginate to fetch them all. |
| **hash** | [long](/type/long.md) | Hash from a previously returned [account.chatThemes](/constructor/account.chatThemes.md) constructor, to avoid returning any result if the theme list hasn't changed. |

### Result
[account.ChatThemes](/type/account.ChatThemes.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [account.chatThemes](/constructor/account.chatThemes.md)
Available [chat themes](/api/themes.md#chat-themes)

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.