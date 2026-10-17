# channels.getFullChannel

Get full info about a [supergroup](/api/channel.md#supergroups), [gigagroup](/api/channel.md#gigagroups) or [channel](/api/channel.md#channels)

```tl
messages.chatFull#e5d7d19c full_chat:ChatFull chats:Vector<Chat> users:Vector<User> = messages.ChatFull;
---functions---
channels.getFullChannel#8736a09 channel:InputChannel = messages.ChatFull;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The [channel](/api/channel.md#channels), [supergroup](/api/channel.md#supergroups) or [gigagroup](/api/channel.md#gigagroups) to get info about |

### Result
[messages.ChatFull](/type/messages.ChatFull.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHANNEL\_PUBLIC\_GROUP\_NA | channel/supergroup not available. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.