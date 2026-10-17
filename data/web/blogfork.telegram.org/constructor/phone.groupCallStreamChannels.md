# phone.groupCallStreamChannels

Contains the available channels of an RTMP-mode group call, see [playing an RTMP livestream »](/api/group-calls.md#rtmp-mode).

```tl
phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channels** | [Vector](/type/Vector%20t)&lt;[GroupCallStreamChannel](/type/GroupCallStreamChannel.md)&gt; | Available RTMP stream channels; may be empty while the external publisher is not sending media |

### Type
[phone.GroupCallStreamChannels](/type/phone.GroupCallStreamChannels.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.