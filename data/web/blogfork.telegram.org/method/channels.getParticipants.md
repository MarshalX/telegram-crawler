# channels.getParticipants

Get the participants of a [supergroup/channel](/api/channel.md)

```tl
channels.channelParticipants#9ab0feaf count:int participants:Vector<ChannelParticipant> chats:Vector<Chat> users:Vector<User> = channels.ChannelParticipants;
channels.channelParticipantsNotModified#f0173fe9 = channels.ChannelParticipants;
---functions---
channels.getParticipants#77ced9d0 channel:InputChannel filter:ChannelParticipantsFilter offset:int limit:int hash:long = channels.ChannelParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel |
| **filter** | [ChannelParticipantsFilter](/type/ChannelParticipantsFilter.md) | Which participant types to fetch |
| **offset** | [int](/type/int.md) | [Offset](/api/offsets.md) |
| **limit** | [int](/type/int.md) | [Limit](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash](/api/offsets.md) |

### Result
[channels.ChannelParticipants](/type/channels.ChannelParticipants.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_MONOFORUM\_UNSUPPORTED | [Monoforums](/api/channel.md#monoforums) do not support this feature. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 403 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.