# EncryptedChat

Object contains info on an encrypted chat.

```tl
encryptedChatEmpty#ab7ec0a0 id:int = EncryptedChat;
encryptedChatWaiting#66b25953 id:int access_hash:long date:int admin_id:long participant_id:long = EncryptedChat;
encryptedChatRequested#48f1d94c flags:# folder_id:flags.0?int id:int access_hash:long date:int admin_id:long participant_id:long g_a:bytes = EncryptedChat;
encryptedChat#61f0d4c7 id:int access_hash:long date:int admin_id:long participant_id:long g_a_or_b:bytes key_fingerprint:long = EncryptedChat;
encryptedChatDiscarded#1e1c7c45 flags:# history_deleted:flags.0?true id:int = EncryptedChat;

---functions---

messages.requestEncryption#f64daf43 user_id:InputUser random_id:int g_a:bytes = EncryptedChat;
messages.acceptEncryption#3dbc0415 peer:InputEncryptedChat g_b:bytes key_fingerprint:long = EncryptedChat;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [encryptedChatEmpty](/constructor/encryptedChatEmpty.md) | Empty constructor. |
| [encryptedChatWaiting](/constructor/encryptedChatWaiting.md) | Chat waiting for approval of second participant. |
| [encryptedChatRequested](/constructor/encryptedChatRequested.md) | Request to create an encrypted chat. |
| [encryptedChat](/constructor/encryptedChat.md) | Encrypted chat |
| [encryptedChatDiscarded](/constructor/encryptedChatDiscarded.md) | Discarded or deleted chat. |

### Methods

| Method | Description |
| --- | --- |
| [messages.requestEncryption](/method/messages.requestEncryption.md) | Sends a request to start a secret chat to the user. |
| [messages.acceptEncryption](/method/messages.acceptEncryption.md) | Confirms creation of a secret chat |