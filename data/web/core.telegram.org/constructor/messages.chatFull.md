# messages.chatFull

Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [basic group](/api/channel.md#basic-groups).

```tl
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **full\_chat** | [ChatFull](/type/ChatFull.md) | Full info |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[messages.ChatFull](/type/messages.ChatFull.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.