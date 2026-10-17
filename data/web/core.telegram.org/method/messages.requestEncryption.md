# messages.requestEncryption

Sends a request to start a secret chat to the user.

```tl
encryptedChatEmpty#ab7ec0a0 id:int = EncryptedChat;
encryptedChatWaiting#66b25953 id:int access_hash:long date:int admin_id:long participant_id:long = EncryptedChat;
encryptedChatRequested#48f1d94c flags:# folder_id:flags.0?int id:int access_hash:long date:int admin_id:long participant_id:long g_a:bytes = EncryptedChat;
encryptedChat#61f0d4c7 id:int access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long = EncryptedChat;
encryptedChatDiscarded#1e1c7c45 flags:# history_deleted:flags.0?true id:int = EncryptedChat;
---functions---
messages.requestEncryption#f64daf43 user_id:InputUser random_id:int g_a:bytes = EncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID |
| **random\_id** | [int](/type/int.md) | Unique client request ID required to prevent resending. This also doubles as the chat ID. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **g\_a** | [bytes](/type/bytes.md) | `A = g ^ a mod p`, see [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) |

### Result
[EncryptedChat](/type/EncryptedChat.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DH\_G\_A\_INVALID | g_a invalid. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | RANDOM\_ID\_DUPLICATE | You provided a random ID that was already used. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |
| 403 | USER\_IS\_BLOCKED | You were blocked by this user. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.