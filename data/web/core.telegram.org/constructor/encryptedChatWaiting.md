# encryptedChatWaiting

Chat waiting for approval of second participant.

```tl
encryptedChatWaiting#66b25953 id:int access_hash:long date:int admin_id:long participant_id:long = EncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [int](/type/int.md) | Chat ID |
| **access\_hash** | [long](/type/long.md) | Checking sum depending on user ID |
| **date** | [int](/type/int.md) | Date of chat creation |
| **admin\_id** | [long](/type/long.md) | Chat creator ID |
| **participant\_id** | [long](/type/long.md) | ID of second chat participant |

### Type
[EncryptedChat](/type/EncryptedChat.md)