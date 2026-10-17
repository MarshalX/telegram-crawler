# updatePeerBlocked

We blocked a peer, see [here »](/api/block.md) for more info on blocklists.

```tl
updatePeerBlocked#ebe07752 flags:# blocked:flags.0?true blocked_my_stories_from:flags.1?true peer_id:Peer = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **blocked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the peer was blocked or unblocked |
| **blocked\_my\_stories\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the peer was added/removed to/from the story blocklist; if not set, this update affects the main blocklist, see [here »](/api/block.md) for more info. |
| **peer\_id** | [Peer](/type/Peer.md) | The (un)blocked peer |

### Type
[Update](/type/Update.md)

### Related pages

#### [Blocked users](/api/block.md)
Working with the blocklist.