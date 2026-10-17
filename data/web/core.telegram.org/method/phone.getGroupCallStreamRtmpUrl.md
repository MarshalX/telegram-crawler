# phone.getGroupCallStreamRtmpUrl

Get the RTMP URL and stream key used by the single external streamer that publishes all audio and video for an RTMP-mode video chat, livestream or live story.

See [here »](/api/group-calls.md#creating-and-publishing-an-rtmp-livestream) for the full flow.

```tl
phone.groupCallStreamRtmpUrl#2dbf3432 url:string key:string = phone.GroupCallStreamRtmpUrl;
---functions---
phone.getGroupCallStreamRtmpUrl#5af4c73a flags:# live_story:flags.0?true peer:InputPeer revoke:Bool = phone.GroupCallStreamRtmpUrl;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **live\_story** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Obtain credentials for an RTMP live story instead of a video chat/livestream |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer that will host the RTMP video chat, livestream or live story |
| **revoke** | [Bool](/type/Bool.md) | Whether to invalidate the previous stream key and generate a new one, instead of returning the existing key |

### Result
[phone.GroupCallStreamRtmpUrl](/type/phone.GroupCallStreamRtmpUrl.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.