# messageEmpty

Empty constructor, non-existent message.

```tl
messageEmpty#90a6ca84 flags:# id:int peer_id:flags.0?Peer = Message;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [int](/type/int.md) | Message identifier |
| **peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | Peer ID, the chat where this message was sent |

### Type
[Message](/type/Message.md)