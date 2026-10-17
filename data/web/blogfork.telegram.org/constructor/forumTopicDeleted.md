# forumTopicDeleted

Represents a deleted [forum topic](/api/forum.md#forum-topics).

This constructor is returned in place of a [forumTopic](/constructor/forumTopic.md) by [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md) (and the other topic-fetching methods) when a topic no longer exists, allowing clients and bots to confirm that a topic was deleted.

```tl
forumTopicDeleted#23f109b id:int = ForumTopic;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | The ID of the deleted forum topic. |

### Type
[ForumTopic](/type/ForumTopic.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [forumTopic](/constructor/forumTopic.md)
Represents a [forum topic](/api/forum.md#forum-topics).

#### [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md)
Get forum topics by their ID