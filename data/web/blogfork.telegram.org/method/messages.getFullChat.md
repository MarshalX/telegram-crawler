# messages.getFullChat

Get full info about a [basic group](/api/channel.md#basic-groups).

```tl
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;
---functions---
messages.getFullChat#aeb00b34 chat_id:long = messages.ChatFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [long](/type/long.md) | [Basic group](/api/channel.md#basic-groups) ID. |

### Result
[messages.ChatFull](/type/messages.ChatFull.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.