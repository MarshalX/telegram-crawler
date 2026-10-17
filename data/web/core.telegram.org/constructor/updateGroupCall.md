# updateGroupCall

Indicates that group call information changed, see [applying group call updates »](/api/group-calls.md#applying-group-call-updates).

```tl
updateGroupCall#9d2216e0 flags:# live_story:flags.2?true peer:flags.1?Peer call:GroupCall = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **live\_story** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this update belongs to a [live story »](/api/group-calls.md#live-stories) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | Peer associated with the group call |
| **call** | [GroupCall](/type/GroupCall.md) | Info about the group call or livestream |

### Type
[Update](/type/Update.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.