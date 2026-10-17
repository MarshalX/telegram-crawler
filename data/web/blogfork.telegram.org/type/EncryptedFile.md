# EncryptedFile

Seta an encrypted file.

```tl
encryptedFileEmpty#c21f497e = EncryptedFile;
encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;

---functions---

messages.uploadEncryptedFile#5057c497 peer:InputEncryptedChat file:InputEncryptedFile = EncryptedFile;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [encryptedFileEmpty](/constructor/encryptedFileEmpty.md) | Empty constructor, non-existing file. |
| [encryptedFile](/constructor/encryptedFile.md) | Encrypted file. |

### Methods

| Method | Description |
| --- | --- |
| [messages.uploadEncryptedFile](/method/messages.uploadEncryptedFile.md) | Upload encrypted file and associate it to a secret chat (without actually sending it to the chat). |