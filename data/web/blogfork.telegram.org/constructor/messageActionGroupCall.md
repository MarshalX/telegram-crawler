# messageActionGroupCall

A [video chat/livestream](/api/group-calls.md#video-chats-livestreams) was started or terminated.

```tl
messageActionGroupCall#7a0d7f42 flags:# call:InputGroupCall duration:flags.0?int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Video chat/livestream that started or ended |
| **duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Duration of the group call in seconds, for terminated calls. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.