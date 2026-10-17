# messageService

Indicates a service message

```tl
messageService#7a800e0a flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true reactions_are_possible:flags.9?true silent:flags.13?true post:flags.14?true legacy:flags.19?true id:int from_id:flags.8?Peer peer_id:Peer saved_peer_id:flags.28?Peer reply_to:flags.3?MessageReplyHeader date:int action:MessageAction reactions:flags.20?MessageReactions ttl_period:flags.25?int = Message;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the message is outgoing |
| **mentioned** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether we were mentioned in the message |
| **media\_unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the message contains unread media |
| **reactions\_are\_possible** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[true](/constructor/true.md) | Whether you can [react to this message »](/api/reactions.md). |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | Whether the message is silent |
| **post** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[true](/constructor/true.md) | Whether it's a channel post |
| **legacy** | [flags](/mtproto/TL-combinators.md#conditional-fields).19?[true](/constructor/true.md) | This is a legacy message: it has to be refetched with the new layer |
| **id** | [int](/type/int.md) | Message ID |
| **from\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[Peer](/type/Peer.md) | ID of the sender of this message |
| **peer\_id** | [Peer](/type/Peer.md) | Sender of service message |
| **saved\_peer\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).28?[Peer](/type/Peer.md) | Will only be set for service messages within a [monoforum topic »](/api/monoforum.md): `peer` will be equal to the ID of the monoforum and the `saved_peer_id` flag will be set to the ID of a topic. |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[MessageReplyHeader](/type/MessageReplyHeader.md) | Reply (thread) information |
| **date** | [int](/type/int.md) | Message date |
| **action** | [MessageAction](/type/MessageAction.md) | Event connected with the service message |
| **reactions** | [flags](/mtproto/TL-combinators.md#conditional-fields).20?[MessageReactions](/type/MessageReactions.md) | [Reactions »](/api/reactions.md). |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[int](/type/int.md) | Time To Live of the message, once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. |

### Type
[Message](/type/Message.md)

### Related pages

#### [Message reactions](/api/reactions.md)
Telegram allows users to react on any message using specific emojis, triggering cute lottie animations.

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.