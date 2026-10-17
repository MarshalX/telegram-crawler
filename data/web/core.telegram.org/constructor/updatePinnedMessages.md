# updatePinnedMessages

Some messages were pinned in a chat

```tl
updatePinnedMessages#ed85eab5 flags:# pinned:flags.0?true peer:Peer messages:Vector<int> pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the messages were pinned or unpinned |
| **peer** | [Peer](/type/Peer.md) | Peer |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Message IDs |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.