# updateMessageReactions

New [message reactions »](/api/reactions.md) are available

```tl
updateMessageReactions#1e297bfa flags:# peer:Peer msg_id:int top_msg_id:flags.0?int saved_peer_id:flags.1?Peer reactions:MessageReactions = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | Peer |
| **msg\_id** | [int](/type/int.md) | Message ID |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Forum topic ID](/api/forum.md#forum-topics) |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | If set, the reactions are in the specified [monoforum topic »](/api/monoforum.md). |
| **reactions** | [MessageReactions](/type/MessageReactions.md) | Reactions |

### Type
[Update](/type/Update.md)

### Related pages

#### [Forum topics](/api/forum.md)
Telegram allows creating forums with multiple distinct topics.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.