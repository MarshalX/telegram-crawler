# sendAsPeer

Indicates a peer that can be used to send messages

```tl
sendAsPeer#b81c7034 flags:# premium_required:flags.0?true peer:Peer = SendAsPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **premium\_required** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether a Telegram Premium account is required to send messages as this peer |
| **peer** | [Peer](/type/Peer.md) | Peer |

### Type
[SendAsPeer](/type/SendAsPeer.md)