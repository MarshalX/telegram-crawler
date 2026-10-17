# updateDraftMessage

Notifies a change of a message [draft](/api/drafts.md).

```tl
updateDraftMessage#edfc111e flags:# peer:Peer top_msg_id:flags.0?int saved_peer_id:flags.1?Peer draft:DraftMessage = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | The peer to which the draft is associated |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | ID of the [forum topic](/api/forum.md#forum-topics) to which the draft is associated |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | If set, the draft is related to the specified [monoforum topic ID »](/api/monoforum.md). |
| **draft** | [DraftMessage](/type/DraftMessage.md) | The draft |

### Type
[Update](/type/Update.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Message drafts](/api/drafts.md)
How to handle message drafts