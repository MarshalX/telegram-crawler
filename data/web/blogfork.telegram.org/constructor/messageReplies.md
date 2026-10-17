# messageReplies

Info about [the comment section of a channel post, a simple message thread, a forum topic, or a direct messages topic](/api/threads.md) (all features ultimately based on message threads).

```tl
messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **comments** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this constructor contains information about the [comment section of a channel post, or a simple message thread](/api/threads.md) |
| **replies** | [int](/type/int.md) | Contains the total number of replies in this thread or comment section. |
| **replies\_pts** | [int](/type/int.md) | [PTS](/api/updates.md) of the message that started this thread. |
| **recent\_repliers** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | For channel post comments, contains information about the last few comment posters for a specific thread, to show a small list of commenter profile pictures in client previews. |
| **channel\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | For channel post comments, contains the ID of the associated [discussion supergroup](/api/discussion.md) |
| **max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | ID of the latest message in this thread or comment section. |
| **read\_max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Contains the ID of the latest read message in this thread or comment section. |

### Type
[MessageReplies](/type/MessageReplies.md)

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Discussion groups](/api/discussion.md)
Groups can be associated to a channel as a discussion group, to allow users to discuss about posts.