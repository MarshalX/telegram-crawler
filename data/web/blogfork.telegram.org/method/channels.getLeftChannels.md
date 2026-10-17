# channels.getLeftChannels

Get a list of [channels/supergroups](/api/channel.md) we left, requires a [takeout session, see here » for more info](/api/takeout.md).

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
channels.getLeftChannels#8341ecc0 offset:int = messages.Chats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [int](/type/int.md) | Offset for [pagination](/api/offsets.md) |

### Result
[messages.Chats](/type/messages.Chats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TAKEOUT\_INVALID | The specified takeout ID is invalid. |
| 403 | TAKEOUT\_REQUIRED | A [takeout](/api/takeout.md) session needs to be initialized first, [see here &raquo; for more info](/api/takeout.md). |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Takeout API](/api/takeout.md)
Telegram's API allows users to export all of their information through the takeout API.