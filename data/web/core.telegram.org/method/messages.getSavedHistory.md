# messages.getSavedHistory

Fetch [saved messages »](/api/saved-messages.md) forwarded from a specific peer, or fetch messages from a [monoforum topic »](/api/monoforum.md).

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.getSavedHistory#998ab009 flags:# parent_peer:flags.0?InputPeer peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If set, fetches messages from the specified monoforum, otherwise fetches from saved messages. |
| **peer** | [InputPeer](/type/InputPeer.md) | Target peer (or topic) |
| **offset\_id** | [int](/type/int.md) | Only return messages starting from the specified message ID |
| **offset\_date** | [int](/type/int.md) | Only return messages sent before the specified date |
| **add\_offset** | [int](/type/int.md) | Number of list elements to be skipped, negative values are also accepted. |
| **limit** | [int](/type/int.md) | Number of results to return |
| **max\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with IDs less than **max\_id** |
| **min\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with IDs more than **min\_id** |
| **hash** | [long](/type/long.md) | [Result hash](/api/offsets.md) |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PARENT\_PEER\_INVALID | The specified `parent_peer` is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Saved messages](/api/saved-messages.md)
The Saved Messages chat allows users to bookmark messages and media: it's a personal cloud storage for any messages or media you may want to send or forward there.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.