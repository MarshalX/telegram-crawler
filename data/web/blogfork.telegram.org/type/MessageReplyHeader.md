# MessageReplyHeader

Reply information

```tl
messageReplyHeader#1b97dd66 flags:# reply_to_scheduled:flags.2?true forum_topic:flags.3?true quote:flags.9?true reply_to_ephemeral:flags.13?true reply_to_msg_id:flags.4?int reply_to_peer_id:flags.0?Peer reply_from:flags.5?MessageFwdHeader reply_media:flags.8?MessageMedia reply_to_top_id:flags.1?int quote_text:flags.6?string quote_entities:flags.7?Vector<MessageEntity> quote_offset:flags.10?int todo_item_id:flags.11?int poll_option:flags.12?bytes = MessageReplyHeader;
messageReplyStoryHeader#e5af939 peer:Peer story_id:int = MessageReplyHeader;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messageReplyHeader](/constructor/messageReplyHeader.md) | Message replies and [thread](/api/threads.md) information |
| [messageReplyStoryHeader](/constructor/messageReplyStoryHeader.md) | Represents a reply to a [story](/api/stories.md) |