# channels.getParticipant

Get info about a [channel/supergroup](/api/channel.md) participant

```tl
channels.channelParticipant#dfb80317 participant:ChannelParticipant chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipant;
---functions---
channels.getParticipant#a0ab6cc6 channel:InputChannel participant:InputPeer = channels.ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel/supergroup |
| **participant** | [InputPeer](/type/InputPeer.md) | Participant to get info about |

### Result
[channels.ChannelParticipant](/type/channels.ChannelParticipant.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PARTICIPANT\_ID\_INVALID | The specified participant ID is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 400 | USER\_NOT\_PARTICIPANT | You're not a member of this supergroup/channel. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.