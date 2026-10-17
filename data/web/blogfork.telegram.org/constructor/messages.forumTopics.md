# messages.forumTopics

Contains information about multiple [forum topics](/api/forum.md#forum-topics)

```tl
messages.forumTopics#367617d3 flags:# order_by_create_date:flags.0?true count:int topics:Vector<ForumTopic> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> pts:int = messages.ForumTopics;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **order\_by\_create\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the returned topics are ordered by creation date; if set, pagination by `offset_date` should use [forumTopic](/constructor/forumTopic.md).`date`; otherwise topics are ordered by the last message date, so paginate by the `date` of the [message](/type/Message.md) referenced by [forumTopic](/constructor/forumTopic.md).`top_message`. |
| **count** | [int](/type/int.md) | Total number of topics matching query; may be more than the topics contained in `topics`, in which case [pagination](/api/offsets.md) is required. |
| **topics** | [Vector](/type/Vector%20t)&lt;[ForumTopic](/type/ForumTopic.md)&gt; | Forum topics |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Related messages (contains the messages mentioned by [forumTopic](/constructor/forumTopic.md).`top_message`). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Related chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Related users |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |

### Type
[messages.ForumTopics](/type/messages.ForumTopics.md)

### Related pages

#### [forumTopic](/constructor/forumTopic.md)
Represents a [forum topic](/api/forum.md#forum-topics).

#### [Message](/type/Message.md)
Object describing a message.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.