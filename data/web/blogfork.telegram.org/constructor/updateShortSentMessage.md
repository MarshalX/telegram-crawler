# updateShortSentMessage

Shortened constructor containing info on one outgoing message to a contact (the destination chat has to be extracted from the method call that returned this object).

```tl
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **out** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the message is outgoing |
| **id** | [int](/type/int.md) | ID of the sent message |
| **pts** | [int](/type/int.md) | [PTS](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [PTS count](/api/updates.md) |
| **date** | [int](/type/int.md) | [date](/api/updates.md) |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[MessageMedia](/type/MessageMedia.md) | Attached media |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Entities](/api/entities.md) for styled text |
| **ttl\_period** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[int](/type/int.md) | Time To Live of the message, once message.date+message.ttl\_period === time(), the message will be deleted on the server, and must be deleted locally as well. |

### Type
[Updates](/type/Updates.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities