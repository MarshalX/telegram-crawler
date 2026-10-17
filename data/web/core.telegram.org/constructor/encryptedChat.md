# encryptedChat

Encrypted chat

```tl
encryptedChat#61f0d4c7 id:int access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long = EncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | Chat ID |
| **access\_hash** | [long](/type/long.md) | Check sum dependent on the user ID |
| **date** | [int](/type/int.md) | Date chat was created |
| **admin\_id** | [long](/type/long.md) | Chat creator ID |
| **participant\_id** | [long](/type/long.md) | ID of the second chat participant |
| **g\_a\_or\_b** | [bytes](/type/bytes.md) | `B = g ^ b mod p`, if the currently authorized user is the chat's creator,\
or `A = g ^ a mod p` otherwise\
See [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) for more info |
| **key\_fingerprint** | [long](/type/long.md) | 64-bit fingerprint of received key |

### Type
[EncryptedChat](/type/EncryptedChat.md)