# messageMediaVideoStream

Identifies the active group call associated with a [live story »](/api/group-calls.md#live-stories).

```tl
messageMediaVideoStream#ca5cab89 flags:# rtmp_stream:flags.0?true call:InputGroupCall = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **rtmp\_stream** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the live story uses [RTMP livestream mode »](/api/group-calls.md#stream-mode) |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Active live story group call |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.