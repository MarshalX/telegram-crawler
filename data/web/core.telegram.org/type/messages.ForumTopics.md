# messages.ForumTopics

Contains information about multiple [forum topics](/api/forum.md#forum-topics)

```tl
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;

---functions---

messages.getForumTopics#3ba47bff flags:# peer:InputPeer q:flags.0?string offset_date:int offset_id:int offset_topic:int limit:int = messages.ForumTopics;
messages.getForumTopicsByID#af0a4a08 peer:InputPeer topics:Vector<int> = messages.ForumTopics;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.forumTopics](/constructor/messages.forumTopics.md) | Contains information about multiple [forum topics](/api/forum.md#forum-topics) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getForumTopics](/method/messages.getForumTopics.md) | Get [topics of a forum](/api/forum.md) |
| [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md) | Get forum topics by their ID |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.