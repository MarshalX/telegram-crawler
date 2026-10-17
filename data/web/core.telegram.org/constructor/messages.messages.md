# messages.messages

Full list of messages with auxiliary data.

```tl
messages.messages#1d73e7ea messages:Vector<Message> topics:Vector<ForumTopic> chats:Vector<Chat> users:Vector<User> = messages.Messages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | List of messages |
| **topics** | [Vector](/type/Vector%20t)&lt;[ForumTopic](/type/ForumTopic.md)&gt; | [Forum topics](/api/forum.md#forum-topics) the returned messages belong to. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | List of chats mentioned in dialogs |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | List of users mentioned in messages and chats |

### Type
[messages.Messages](/type/messages.Messages.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.