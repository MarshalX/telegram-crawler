# messagePeerReaction

How a certain peer reacted to the message

```tl
messagePeerReaction#8c79b63c flags:# big:flags.0?true unread:flags.1?true my:flags.2?true peer_id:Peer date:int reaction:Reaction = MessagePeerReaction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **big** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the specified [message reaction »](/api/reactions.md) should elicit a bigger and longer reaction |
| **unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the reaction wasn't yet marked as read by the current user |
| **my** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Starting from layer 159, [messages.sendReaction](/method/messages.sendReaction.md) will send reactions from the peer (user or channel) specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md). \
If set, this flag indicates that this reaction was sent by us, even if the `peer` doesn't point to the current account. |
| **peer\_id** | [Peer](/type/Peer.md) | Peer that reacted to the message |
| **date** | [int](/type/int.md) | When was this reaction added |
| **reaction** | [Reaction](/type/Reaction.md) | Reaction emoji |

### Type
[MessagePeerReaction](/type/MessagePeerReaction.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [messages.sendReaction](/method/messages.sendReaction.md)
React to message.

Starting from layer 159, the reaction will be sent from the peer specified using [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md).

#### [messages.saveDefaultSendAs](/method/messages.saveDefaultSendAs.md)
Change the default peer that should be used when sending messages, reactions, poll votes to a specific group