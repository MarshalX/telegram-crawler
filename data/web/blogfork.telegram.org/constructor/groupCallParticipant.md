# groupCallParticipant

Describes a group call participant and their current state, see [applying group call updates »](/api/group-calls.md#applying-group-call-updates).

```tl
groupCallParticipant#2a3dc7ac flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo paid_stars_total:flags.16?long = GroupCallParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **muted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the participant is muted |
| **left** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the participant left the media layer; in conferences, another participant must then prune them from the E2E blockchain |
| **can\_self\_unmute** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the participant can unmute themselves |
| **just\_joined** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether the participant has just joined |
| **versioned** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, the application logic for this update is slightly different, see [here »](/api/group-calls.md#applying-group-call-updates) for more info on the full flow. |
| **min** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If not set, the `volume` and `muted_by_you` fields can be safely used to overwrite locally cached information; otherwise, `volume` will contain valid information only if `volume_by_admin` is set both in the cache and in the received constructor. |
| **muted\_by\_you** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether this participant was muted by the current user |
| **volume\_by\_admin** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[true](/constructor/true.md) | Whether our volume can only changed by an admin |
| **self** | [flags](/mtproto/TL-combinators.md#conditional-fields).12?[true](/constructor/true.md) | Whether this participant is the current user |
| **video\_joined** | [flags](/mtproto/TL-combinators.md#conditional-fields).15?[true](/constructor/true.md) | Whether this participant is currently broadcasting video |
| **peer** | [Peer](/type/Peer.md) | Peer represented by this participant |
| **date** | [int](/type/int.md) | When did this participant join the group call |
| **active\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | When was this participant last active in the group call |
| **source** | [int](/type/int.md) | Source ID of the participant's main audio stream |
| **volume** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | Volume, between `1` and `20000`; `10000` represents 100% volume. If not set, the volume is set to 100%. |
| **about** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | Info about this participant |
| **raise\_hand\_rating** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[long](/type/long.md) | Specifies the UI visualization order of peers with raised hands: peers with a higher rating should be showed first in the list. |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[GroupCallParticipantVideo](/type/GroupCallParticipantVideo.md) | Info about the video stream the participant is currently broadcasting |
| **presentation** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[GroupCallParticipantVideo](/type/GroupCallParticipantVideo.md) | Info about the screen sharing stream the participant is currently broadcasting |
| **paid\_stars\_total** | [flags](/mtproto/TL-combinators.md#conditional-fields).16?[long](/type/long.md) | Total Stars donated by this participant in a live story |

### Type
[GroupCallParticipant](/type/GroupCallParticipant.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.