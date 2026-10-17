# updateShortMessage

Info about a message sent to (received from) another user

```tl
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the message is outgoing |
| **mentioned** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether we were mentioned in the message |
| **media\_unread** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether there are some **unread** mentions in this message |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[true](/constructor/true.md) | If true, the message is a silent message, no notifications should be triggered |
| **id** | [int](/type/int.md) | The message ID |
| **user\_id** | [long](/type/long.md) | The ID of the sender (if `outgoing` will be the ID of the destination) of the message |
| **message** | [string](/type/string.md) | The message |
| **pts** | [int](/type/int.md) | [PTS](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [PTS count](/api/updates.md) |
| **date** | [int](/type/int.md) | [date](/api/updates.md) |
| **fwd\_from** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[MessageFwdHeader](/type/MessageFwdHeader.md) | Info about a forwarded message |
| **via\_bot\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[long](/type/long.md) | Info about the inline bot used to generate this message |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[MessageReplyHeader](/type/MessageReplyHeader.md) | Reply and [thread](/api/threads.md) information |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Entities](/api/entities.md) for styled text |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[int](/type/int.md) | Time To Live of the message, once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. |

### Type
[Updates](/type/Updates.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities