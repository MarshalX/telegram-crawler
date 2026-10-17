# messages.sendEncryptedService

Sends a service message to a secret chat.

```tl
messages.sentEncryptedMessage#560f8935 date:int = messages.SentEncryptedMessage;
messages.sentEncryptedFile#9493ff32 date:int file:EncryptedFile = messages.SentEncryptedMessage;
---functions---
messages.sendEncryptedService#32d439a4 peer:InputEncryptedChat random_id:long data:bytes = messages.SentEncryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | Secret chat ID |
| **random\_id** | [long](/type/long.md) | Unique client message ID required to prevent message resending. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **data** | [bytes](/type/bytes.md) | TL-serialization of  [DecryptedMessage](/type/DecryptedMessage.md) type, encrypted with a key generated during chat initialization |

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
| 400 | ENCRYPTION\_ID\_INVALID | The provided secret chat ID is invalid. |
| 500 | MSG\_WAIT\_FAILED | A waiting call returned an error. |
| 403 | USER\_DELETED | You can't send this secret message because the other participant deleted their account. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [DecryptedMessage](/type/DecryptedMessage.md)
Object describes the contents of an encrypted message.