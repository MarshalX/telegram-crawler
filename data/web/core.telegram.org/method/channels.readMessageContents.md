# channels.readMessageContents

Mark [channel/supergroup](/api/channel.md) message contents as read, emitting an [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.readMessageContents#eab5dc38 channel:InputChannel id:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | [Channel/supergroup](/api/channel.md) |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages whose contents should be marked as read |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [updateChannelReadMessagesContents](/constructor/updateChannelReadMessagesContents.md)
The specified [channel/supergroup](/api/channel.md) messages were read (emitted specifically for messages like voice messages or video, only once the media is watched and marked as read using [channels.readMessageContents](/method/channels.readMessageContents.md))