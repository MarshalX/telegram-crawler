# messages.DiscussionMessage

Info about a message thread

```tl
messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;

---functions---

messages.getDiscussionMessage#446972fd peer:InputPeer msg_id:int = messages.DiscussionMessage;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.discussionMessage](/constructor/messages.discussionMessage.md) | Information about a [message thread](/api/threads.md) |

### Methods

| Method | Description |
| --- | --- |
| [messages.getDiscussionMessage](/method/messages.getDiscussionMessage.md) | Get [discussion message](/api/threads.md) from the [associated discussion group](/api/discussion.md) of a channel to show it on top of the comment section, without actually joining the group |