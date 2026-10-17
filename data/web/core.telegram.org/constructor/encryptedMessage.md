# encryptedMessage

Encrypted message.

```tl
encryptedMessage#ed18c118 random_id:long chat_id:int date:int bytes:bytes file:EncryptedFile = EncryptedMessage;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **random\_id** | [long](/type/long.md) | Random message ID, assigned by the author of message. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **chat\_id** | [int](/type/int.md) | ID of encrypted chat |
| **date** | [int](/type/int.md) | Date of sending |
| **bytes** | [bytes](/type/bytes.md) | TL-serialization of [DecryptedMessage](/type/DecryptedMessage.md) type, encrypted with the key created at chat initialization |
| **file** | [EncryptedFile](/type/EncryptedFile.md) | Attached encrypted file |

### Type
[EncryptedMessage](/type/EncryptedMessage.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [DecryptedMessage](/type/DecryptedMessage.md)
Object describes the contents of an encrypted message.