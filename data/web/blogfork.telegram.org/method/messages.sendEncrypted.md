# messages.sendEncrypted

Sends a text message to a secret chat.

```tl
messages.sentEncryptedMessage#560f8935 date:int = messages.SentEncryptedMessage;
messages.sentEncryptedFile#9493ff32 date:int file:EncryptedFile = messages.SentEncryptedMessage;
---functions---
messages.sendEncrypted#44fa7a15 flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Send encrypted message without a notification |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | Secret chat ID |
| **random\_id** | [long](/type/long.md) | Unique client message ID, necessary to avoid message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **data** | [bytes](/type/bytes.md) | TL-serialization of [DecryptedMessage](/type/DecryptedMessage.md) type, encrypted with a key that was created during chat initialization |

### Result
[messages.SentEncryptedMessage](/type/messages.SentEncryptedMessage.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | DATA\_INVALID | Encrypted data invalid. |
| 400 | DATA\_TOO\_LONG | Data too long. |
| 400 | ENCRYPTION\_DECLINED | The secret chat was declined. |
| 500 | MSG\_WAIT\_FAILED | A waiting call returned an error. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [DecryptedMessage](/type/DecryptedMessage.md)
Object describes the contents of an encrypted message.