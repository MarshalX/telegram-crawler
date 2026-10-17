# messages.discussionMessage

Information about a [message thread](/api/threads.md)

```tl
messages.discussionMessage#a6341782 flags:# messages:Vector<Message> max_id:flags.0?int read_inbox_max_id:flags.1?int read_outbox_max_id:flags.2?int unread_count:int chats:Vector<Chat> users:Vector<User> = messages.DiscussionMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | The messages from which the thread starts. The messages are returned in reverse chronological order (i.e., in order of decreasing message ID). |
| **max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Message ID of latest reply in this [thread](/api/threads.md) |
| **read\_inbox\_max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Message ID of latest read incoming message in this [thread](/api/threads.md) |
| **read\_outbox\_max\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Message ID of latest read outgoing message in this [thread](/api/threads.md) |
| **unread\_count** | [int](/type/int.md) | Number of unread messages |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in constructor |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in constructor |

### Type
[messages.DiscussionMessage](/type/messages.DiscussionMessage.md)

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.