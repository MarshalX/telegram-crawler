# decryptedMessage

Contents of an encrypted message.

```tl
===8===
decryptedMessage#1f814f1f random_id:long random_bytes:bytes message:string media:DecryptedMessageMedia = DecryptedMessage;

===17===
decryptedMessage#204d3878 random_id:long ttl:int message:string media:DecryptedMessageMedia = DecryptedMessage;

===45===
decryptedMessage#36b091de flags:# random_id:long ttl:int message:string media:flags.9?DecryptedMessageMedia entities:flags.7?Vector<MessageEntity> via_bot_name:flags.11?string reply_to_random_id:flags.3?long = DecryptedMessage;

===73===
decryptedMessage#91cc4674 flags:# no_webpage:flags.1?true silent:flags.5?true random_id:long ttl:int message:string media:flags.9?DecryptedMessageMedia entities:flags.7?Vector<MessageEntity> via_bot_name:flags.11?string reply_to_random_id:flags.3?long grouped_id:flags.17?long = DecryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [long](/type/long.md) | Random message ID, assigned by the author of message.\
Must be equal to the ID passed to sending method. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **random\_bytes** | [bytes](/type/bytes.md) | Random bytes, removed in layer 17. |
| **message** | [string](/type/string.md) | Message text |
| **media** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[DecryptedMessageMedia](/type/DecryptedMessageMedia.md) | Media content |
| **ttl** | [int](/type/int.md) | Message lifetime. Has higher priority than [decryptedMessageActionSetMessageTTL](/constructor/decryptedMessageActionSetMessageTTL.md).\
Parameter added in Layer 17. |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) (added in layer 45) |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | Message [entities](/api/entities.md) for styled text (parameter added in layer 45) |
| **via\_bot\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).11?[string](/type/string.md) | Specifies the ID of the inline bot that generated the message (parameter added in layer 45) |
| **reply\_to\_random\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | Random message ID of the message this message replies to (parameter added in layer 45) |
| **grouped\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).17?[long](/type/long.md) | Random group ID, assigned by the author of message.\
Multiple encrypted messages with a photo attached and with the same group ID indicate an [album or grouped media](/api/files.md#albums-grouped-media) (parameter added in layer 45) |

### Type
[DecryptedMessage](/type/DecryptedMessage.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [decryptedMessageActionSetMessageTTL](/constructor/decryptedMessageActionSetMessageTTL.md)
Setting of a message lifetime after reading.

Upon receiving such message the client shall start deleting of all messages of an encrypted chat **ttl\_seconds** seconds after the messages were read by user.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.