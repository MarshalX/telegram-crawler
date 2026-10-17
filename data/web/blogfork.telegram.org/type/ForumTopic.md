# ForumTopic

Contains information about a [forum topic](/api/forum.md#forum-topics)

```tl
forumTopicDeleted#23f109b id:int = ForumTopic;
forumTopic#fcdad815 flags:# my:flags.1?true closed:flags.2?true pinned:flags.3?true short:flags.5?true hidden:flags.6?true title_missing:flags.7?true id:int date:int peer:Peer title:string icon_color:int icon_emoji_id:flags.0?long top_message:int read_inbox_max_id:int read_outbox_max_id:int unread_count:int unread_mentions_count:int unread_reactions_count:int unread_poll_votes_count:int from_id:Peer notify_settings:PeerNotifySettings draft:flags.4?DraftMessage = ForumTopic;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [forumTopicDeleted](/constructor/forumTopicDeleted.md) | Represents a deleted [forum topic](/api/forum.md#forum-topics).\
\
This constructor is returned in place of a [forumTopic](/constructor/forumTopic.md) by [messages.getForumTopicsByID](/method/messages.getForumTopicsByID.md) (and the other topic-fetching methods) when a topic no longer exists, allowing clients and bots to confirm that a topic was deleted. |
| [forumTopic](/constructor/forumTopic.md) | Represents a [forum topic](/api/forum.md#forum-topics). |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.