# encryptedChatRequested

Request to create an encrypted chat.

```tl
encryptedChatRequested#48f1d94c flags:# folder_id:flags.0?int id:int access_hash:long date:int admin_id:long participant_id:long g_a:bytes = EncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **folder\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Peer folder ID, for more info click here](/api/folders.md#peer-folders) |
| **id** | [int](/type/int.md) | Chat ID |
| **access\_hash** | [long](/type/long.md) | Check sum depending on user ID |
| **date** | [int](/type/int.md) | Chat creation date |
| **admin\_id** | [long](/type/long.md) | Chat creator ID |
| **participant\_id** | [long](/type/long.md) | ID of second chat participant |
| **g\_a** | [bytes](/type/bytes.md) | `A = g ^ a mod p`, see [Wikipedia](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) |

### Type
[EncryptedChat](/type/EncryptedChat.md)

### Related pages

#### [Dialog folders](/api/folders.md)
Telegram allows placing chats into folders, based on their type, mute status, or other custom criteria, thanks to folder blacklists and whitelists.