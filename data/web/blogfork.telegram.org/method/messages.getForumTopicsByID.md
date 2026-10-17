# messages.getForumTopicsByID

Get forum topics by their ID

```tl
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;
---functions---
messages.getForumTopicsByID#af0a4a08 peer:InputPeer topics:Vector<int> = messages.ForumTopics;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The supergroup forum, private chat (for forum-enabled bots) or bot forum (for users) where the topic is located. |
| **topics** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Topic IDs |

### Result
[messages.ForumTopics](/type/messages.ForumTopics.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | TOPICS\_EMPTY | You specified no topic IDs. |