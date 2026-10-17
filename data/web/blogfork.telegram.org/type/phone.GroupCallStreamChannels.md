# phone.GroupCallStreamChannels

Info about RTMP streams in a group call or livestream

```tl
phone.groupCallStreamChannels#d0e482b2 channels:Vector<GroupCallStreamChannel> = phone.GroupCallStreamChannels;

---functions---

phone.getGroupCallStreamChannels#1ab21940 call:InputGroupCall = phone.GroupCallStreamChannels;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.groupCallStreamChannels](/constructor/phone.groupCallStreamChannels.md) | Contains the available channels of an RTMP-mode group call, see [playing an RTMP livestream »](/api/group-calls.md#rtmp-mode). |

### Methods

| Method | Description |
| --- | --- |
| [phone.getGroupCallStreamChannels](/method/phone.getGroupCallStreamChannels.md) | Get the available stream channels and current playback timestamp of an RTMP-mode video chat, livestream or live story, see [here »](/api/group-calls.md#rtmp-mode) for the full flow.  \
The group call must be joined before invoking this method. Send the request to the media DC specified by [groupCall](/constructor/groupCall.md).`stream_dc_id`. |