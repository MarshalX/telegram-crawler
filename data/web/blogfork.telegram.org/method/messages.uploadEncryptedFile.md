# messages.uploadEncryptedFile

Upload encrypted file and associate it to a secret chat (without actually sending it to the chat).

```tl
encryptedFileEmpty#c21f497e = EncryptedFile;
encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;
---functions---
messages.uploadEncryptedFile#5057c497 peer:InputEncryptedChat file:InputEncryptedFile = EncryptedFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputEncryptedChat](/type/InputEncryptedChat.md) | The secret chat to associate the file to |
| **file** | [InputEncryptedFile](/type/InputEncryptedFile.md) | The file |

### Result
[EncryptedFile](/type/EncryptedFile.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |