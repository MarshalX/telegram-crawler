# updateDialogUnreadMark

The manual unread mark of a chat was changed

```tl
updateDialogUnreadMark#b658f23e flags:# unread:flags.0?true peer:DialogPeer saved_peer_id:flags.1?Peer = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Was the chat marked or unmarked as read |
| **peer** | [DialogPeer](/type/DialogPeer.md) | The dialog |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | If set, the mark is related to the specified [monoforum topic ID »](/api/monoforum.md). |

### Type
[Update](/type/Update.md)

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.