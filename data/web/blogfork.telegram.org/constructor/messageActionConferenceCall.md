# messageActionConferenceCall

Represents a [conference call »](/api/group-calls.md#conference-calls), or an invitation to one if neither the `missed` nor `active` flags are set.

If [call\_requests\_disabled](/api/config.md#call-requests-disabled) is not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls.

```tl
messageActionConferenceCall#2ffe2f7a flags:# missed:flags.0?true active:flags.1?true video:flags.4?true call_id:long duration:flags.2?int other_participants:flags.3?Vector<Peer> = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **missed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the conference call has ended and the user hasn't joined. |
| **active** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the user is currently in the conference call. |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this is a video conference call. |
| **call\_id** | [long](/type/long.md) | Call ID. |
| **duration** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Call duration, for left calls only. |
| **other\_participants** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | Identifiers of some other call participants. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [messageActionConferenceCall](/constructor/messageActionConferenceCall.md)
Represents a [conference call »](/api/group-calls.md#conference-calls), or an invitation to one if neither the `missed` nor `active` flags are set.

If [call\_requests\_disabled](/api/config.md#call-requests-disabled) is not set or false, an incoming [messageActionConferenceCall](/constructor/messageActionConferenceCall.md) with the `missed` and `active` flags **not** set should trigger ringing and an incoming call screen, just like for one-on-one calls.