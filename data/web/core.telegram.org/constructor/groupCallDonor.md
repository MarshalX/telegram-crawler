# groupCallDonor

Describes a live story donor in the [donation leaderboard »](/api/group-calls.md#paid-live-story-donations).

```tl
groupCallDonor#ee430c85 flags:# top:flags.0?true my:flags.1?true peer_id:flags.3?Peer stars:long = GroupCallDonor;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **top** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this donor is included in the top-donor leaderboard |
| **my** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this entry describes the current user's donations |
| **peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Peer](/type/Peer.md) | Donor displayed in the leaderboard |
| **stars** | [long](/type/long.md) | Total Stars donated by this donor |

### Type
[GroupCallDonor](/type/GroupCallDonor.md)

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.