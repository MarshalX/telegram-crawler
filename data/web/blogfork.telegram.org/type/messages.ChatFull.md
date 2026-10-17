# messages.ChatFull

Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [basic group](/api/channel.md#basic-groups).

```tl
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;

---functions---

messages.getFullChat#aeb00b34 chat_id:long = messages.ChatFull;
channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.chatFull](/constructor/messages.chatFull.md) | Full info about a [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [basic group](/api/channel.md#basic-groups). |

### Methods

| Method | Description |
| --- | --- |
| [messages.getFullChat](/method/messages.getFullChat.md) | Get full info about a [basic group](/api/channel.md#basic-groups). |
| [channels.getFullChannel](/method/channels.getFullChannel.md) | Get full info about a [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [channel](/api/channel.md#channels) |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.