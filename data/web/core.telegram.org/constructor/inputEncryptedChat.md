# inputEncryptedChat

An [e2e encrypted chat](/api/end-to-end.md).

```tl
inputEncryptedChat#f141b5e1 chat_id:int access_hash:long = InputEncryptedChat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chat\_id** | [int](/type/int.md) | Chat ID |
| **access\_hash** | [long](/type/long.md) | Access hash from [encryptedChat](/constructor/encryptedChat.md), [encryptedChatWaiting](/constructor/encryptedChatWaiting.md) or [encryptedChatRequested](/constructor/encryptedChatRequested.md) |

### Type
[InputEncryptedChat](/type/InputEncryptedChat.md)

### Related pages

#### [encryptedChat](/constructor/encryptedChat.md)
Encrypted chat

#### [encryptedChatWaiting](/constructor/encryptedChatWaiting.md)
Chat waiting for approval of second participant.

#### [encryptedChatRequested](/constructor/encryptedChatRequested.md)
Request to create an encrypted chat.

#### [End-to-End Encryption, Secret Chats](/api/end-to-end.md)
New feature for end-to-end-encrypted messaging.