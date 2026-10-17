# messages.getForumTopics

Get [topics of a forum](/api/forum.md)

```tl
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;
---functions---
messages.getForumTopics#3ba47bff flags:# peer:InputPeer q:flags.0?string offset_date:int offset_id:int offset_topic:int limit:int = messages.ForumTopics;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The supergroup forum, private chat (for forum-enabled bots) or bot forum (for users) where the topic is located. |
| **q** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Search query |
| **offset\_date** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), date of the last message of the last found topic. Use 0 or any date in the future to get results from the last topic. |
| **offset\_id** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), ID of the last message of the last found topic (or initially `0`). |
| **offset\_topic** | [int](/type/int.md) | [Offsets for pagination, for more info click here](/api/offsets.md), ID of the last found topic (or initially `0`). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md). For optimal performance, the number of returned topics is chosen by the server and can be smaller than the specified limit. |

### Result
[messages.ForumTopics](/type/messages.ForumTopics.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_FORUM\_MISSING | This supergroup is not a forum. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.