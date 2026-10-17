# messages.searchSentMedia

View and search recently sent media.  
This method does not support pagination.

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.searchSentMedia#107e31a0 q:string filter:MessagesFilter limit:int = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **q** | [string](/type/string.md) | Optional search query |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Message filter |
| **limit** | [int](/type/int.md) | Maximum number of results to return (max 100). |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |