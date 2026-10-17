# messages.getReplies

Get messages in a reply thread

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.getReplies#22ddd30c peer:InputPeer msg_id:int offset_id:int offset_date:int add_offset:int limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **msg\_id** | [int](/type/int.md) | Message ID |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **add\_offset** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **max\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with ID smaller than max\_id |
| **min\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with ID bigger than min\_id |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TOPIC\_ID\_INVALID | The specified topic ID is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.