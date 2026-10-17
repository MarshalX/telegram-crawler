# channels.getChannels

Get info about [channels/supergroups](/api/channel.md)

```tl
messages.chats#64ff9fd5 chats:Vector<Chat> = messages.Chats;
messages.chatsSlice#9cd81144 count:int chats:Vector<Chat> = messages.Chats;
---functions---
channels.getChannels#a7f6bbb id:Vector<InputChannel> = messages.Chats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[InputChannel](/type/InputChannel.md)&gt; | IDs of channels/supergroups to get info about |

### Result
[messages.Chats](/type/messages.Chats.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | USER\_BANNED\_IN\_CHANNEL | You're banned from sending messages in supergroups/channels. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.