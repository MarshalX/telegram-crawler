# messages.sendEncryptedFile

Sends a message with a file attachment to a secret chat

```tl
messages.sentEncryptedMessage#560f8935 date:int = messages.SentEncryptedMessage;
messages.sentEncryptedFile#9493ff32 date:int file:EncryptedFile = messages.SentEncryptedMessage;
---functions---
messages.sendEncryptedFile#5559481d flags:# silent:flags.0?true peer:InputEncryptedChat random_id:long data:bytes file:InputEncryptedFile = messages.SentEncryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to send the file without triggering a notification |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | Secret chat ID |
| **random\_id** | [long](/type/long.md) | Unique client message ID necessary to prevent message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **data** | [bytes](/type/bytes.md) | TL-serialization of [DecryptedMessage](/type/DecryptedMessage.md) type, encrypted with a key generated during chat initialization |
| **file** | [InputEncryptedFile](/type/InputEncryptedFile.md) | File attachment for the secret chat |

### Result
[messages.SentEncryptedMessage](/type/messages.SentEncryptedMessage.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | DATA\_TOO\_LONG | Data too long. |
| 400 | ENCRYPTION\_DECLINED | The secret chat was declined. |
| 400 | FILE\_EMTPY | An empty file was provided. |
| 400 | MD5\_CHECKSUM\_INVALID | The MD5 checksums do not match. |
| 400 | MSG\_WAIT\_FAILED | A waiting call returned an error. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [DecryptedMessage](/type/DecryptedMessage.md)
Object describes the contents of an encrypted message.