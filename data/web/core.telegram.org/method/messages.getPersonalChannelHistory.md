# messages.getPersonalChannelHistory

Fetch the message history of a user's [personal channel »](/api/profile.md#personal-channel).

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesSlice#5f206716 flags:# inexact:flags.1?true count:int next_rate:flags.0?int offset_id_offset:flags.2?int search_flood:flags.3?SearchPostsFlood messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.channelMessages#c776ba4e flags:# inexact:flags.1?true pts:int count:int offset_id_offset:flags.2?int messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
messages.messagesNotModified#74535f21 count:int = messages.Messages;
---functions---
messages.getPersonalChannelHistory#55fb0996 user_id:InputUser limit:int max_id:int min_id:int hash:long = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | The user whose personal channel history to fetch |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |
| **max\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with IDs less than **max\_id** |
| **min\_id** | [int](/type/int.md) | If a positive value was transferred, the method will return only messages with IDs more than **min\_id** |
| **hash** | [long](/type/long.md) | [Result hash](/api/offsets.md) |

### Result
[messages.Messages](/type/messages.Messages.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [User profiles](/api/profile.md)
Telegram offers many customization options for your profile!