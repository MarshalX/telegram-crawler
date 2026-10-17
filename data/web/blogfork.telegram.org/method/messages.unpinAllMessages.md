# messages.unpinAllMessages

[Unpin](/api/pin.md) all pinned messages

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
messages.unpinAllMessages#62dd747 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat where to unpin |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Forum topic](/api/forum.md#forum-topics) where to unpin |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, must be equal to the ID of a [monoforum topic](/api/monoforum.md), and will unpin all messages pinned in the passed monoforum topic. |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Pinned messages](/api/pin.md)
Telegram allows pinning multiple messages on top of a specific chat.