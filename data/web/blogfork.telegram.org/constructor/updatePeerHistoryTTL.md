# updatePeerHistoryTTL

The Time-To-Live for messages sent by the current user in a specific chat has changed

```tl
updatePeerHistoryTTL#bb9bb9a5 flags:# peer:Peer ttl_period:flags.0?int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | The chat |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | The new Time-To-Live |

### Type
[Update](/type/Update.md)