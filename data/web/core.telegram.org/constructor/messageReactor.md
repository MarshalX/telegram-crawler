# messageReactor

Info about a user in the [paid Star reactions leaderboard](/api/reactions.md#paid-reactions) for a message.

```tl
messageReactor#4ba3a95a flags:# top:flags.0?true my:flags.1?true anonymous:flags.2?true peer_id:flags.3?Peer count:int = MessageReactor;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **top** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the reactor is one of the most active reactors; may be unset if the reactor is the current user. |
| **my** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, this reactor is the current user. |
| **anonymous** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the reactor is anonymous. |
| **peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Peer](/type/Peer.md) | Identifier of the peer that reacted: may be unset for anonymous reactors different from the current user (i.e. if the current user sent an anonymous reaction `anonymous` will be set but this field will also be set). |
| **count** | [int](/type/int.md) | The number of sent Telegram Stars. |

### Type
[MessageReactor](/type/MessageReactor.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.