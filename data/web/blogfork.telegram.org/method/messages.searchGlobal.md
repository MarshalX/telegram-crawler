# messages.searchGlobal

Search for messages and peers globally

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.searchGlobal#4bc6589a flags:# broadcasts_only:flags.1?true groups_only:flags.2?true users_only:flags.3?true folder_id:flags.0?int q:string filter:MessagesFilter min_date:int max_date:int offset_rate:int offset_peer:InputPeer offset_id:int limit:int = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **broadcasts\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, only returns results from channels (used in the [global channel search tab »](/api/search.md#global-search)). |
| **groups\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether to search only in groups |
| **users\_only** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to search only in private chats |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **q** | [string](/type/string.md) | Query |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Global search filter |
| **min\_date** | [int](/type/int.md) | If a positive value was specified, the method will return only messages with date bigger than min\_date |
| **max\_date** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with date smaller than max\_date |
| **offset\_rate** | [int](/type/int.md) | Initially 0, then set to the [`next_rate` parameter of messages.messagesSlice](/constructor/messages.messagesSlice.md), or if that is absent, the `date` of the last returned message. |
| **offset\_peer** | [InputPeer](/type/InputPeer.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FOLDER\_ID\_INVALID | Invalid folder ID. |
| 400 | INPUT\_FILTER\_INVALID | The specified filter is invalid. |
| 400 | SEARCH\_QUERY\_EMPTY | The search query is empty. |

### Related pages

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.

#### [messages.messagesSlice](/constructor/messages.messagesSlice.md)
Incomplete list of messages and auxiliary data.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.