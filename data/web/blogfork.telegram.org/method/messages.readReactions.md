# messages.readReactions

Mark [message reactions »](/api/reactions.md) as read

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;
---functions---
messages.readReactions#9ec44f93 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Mark as read only reactions to messages within the specified [forum topic](/api/forum.md#forum-topics) |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputPeer](/type/InputPeer.md) | If set, must be equal to the ID of a [monoforum topic](/api/monoforum.md): will affect that topic in the monoforum passed in `peer`. |

### Result
[messages.AffectedHistory](/type/messages.AffectedHistory.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.