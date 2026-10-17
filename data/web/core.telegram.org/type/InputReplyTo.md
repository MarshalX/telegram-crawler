# InputReplyTo

Contains info about a message or story to reply to.

```tl
inputReplyToMessage#3bd4b7c2 flags:# reply_to_msg_id:int top_msg_id:flags.0?int reply_to_peer_id:flags.1?InputPeer quote_text:flags.2?string quote_entities:flags.3?Vector<MessageEntity> quote_offset:flags.4?int monoforum_peer_id:flags.5?InputPeer todo_item_id:flags.6?int poll_option:flags.7?bytes = InputReplyTo;
inputReplyToStory#5881323a peer:InputPeer story_id:int = InputReplyTo;
inputReplyToMonoForum#69d66c45 monoforum_peer_id:InputPeer = InputReplyTo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputReplyToMessage](/constructor/inputReplyToMessage.md) | Reply to a message. |
| [inputReplyToStory](/constructor/inputReplyToStory.md) | Reply to a story. |
| [inputReplyToMonoForum](/constructor/inputReplyToMonoForum.md) | Used to send messages to a [monoforum topic](/api/monoforum.md). |