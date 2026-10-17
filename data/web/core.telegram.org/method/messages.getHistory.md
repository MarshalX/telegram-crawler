# messages.getHistory

Returns the message history in a peer.

Results are ordered by date (descending).

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.getHistory#4423e6c5 peer:InputPeer offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Target peer |
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
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | FROZEN\_PARTICIPANT\_MISSING | The current account is [frozen](/api/auth.md#frozen-accounts), and cannot access the specified peer. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TAKEOUT\_INVALID | The specified takeout ID is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [User Authorization](/api/auth.md)
How to register a user's phone to start using the API.