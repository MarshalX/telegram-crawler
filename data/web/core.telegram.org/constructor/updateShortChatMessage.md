# updateShortChatMessage

Shortened constructor containing info on one new incoming text message from a chat

```tl
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the message is outgoing |
| **mentioned** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether we were mentioned in this message |
| **media\_unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the message contains some **unread** mentions |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | If true, the message is a silent message, no notifications should be triggered |
| **id** | [int](/type/int.md) | ID of the message |
| **from\_id** | [long](/type/long.md) | ID of the sender of the message |
| **chat\_id** | [long](/type/long.md) | ID of the chat where the message was sent |
| **message** | [string](/type/string.md) | Message |
| **pts** | [int](/type/int.md) | [PTS](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [PTS count](/api/updates.md) |
| **date** | [int](/type/int.md) | [date](/api/updates.md) |
| **fwd\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[MessageFwdHeader](/type/MessageFwdHeader.md) | Info about a forwarded message |
| **via\_bot\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[long](/type/long.md) | Info about the inline bot used to generate this message |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[MessageReplyHeader](/type/MessageReplyHeader.md) | Reply (thread) information |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Entities](/api/entities.md) for styled text |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[int](/type/int.md) | Time To Live of the message, once updateShortChatMessage.date+updateShortChatMessage.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. |

### Type
[Updates](/type/Updates.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities