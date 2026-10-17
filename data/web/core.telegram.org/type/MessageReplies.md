# MessageReplies

Info about [post comments (for channels) or message replies (for groups)](/api/threads.md)

```tl
messageReplies#83d60fc2 flags:# comments:flags.0?true replies:int replies_pts:int recent_repliers:flags.1?Vector<Peer> channel_id:flags.0?long max_id:flags.2?int read_max_id:flags.3?int = MessageReplies;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messageReplies](/constructor/messageReplies.md) | Info about [the comment section of a channel post, a simple message thread, a forum topic, or a direct messages topic](/api/threads.md) (all features ultimately based on message threads). |

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.