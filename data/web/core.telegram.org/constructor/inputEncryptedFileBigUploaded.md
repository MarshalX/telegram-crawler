# inputEncryptedFileBigUploaded

Assigns a new big encrypted file (over 10 MB in size), saved in parts using the method [upload.saveBigFilePart](/method/upload.saveBigFilePart.md).

```tl
inputEncryptedFileBigUploaded#2dc173c8 id:long parts:int key_fingerprint:int = InputEncryptedFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Random file id, created by the client |
| **parts** | [int](/type/int.md) | Number of saved parts |
| **key\_fingerprint** | [int](/type/int.md) | 32-bit imprint of the key used to encrypt the file |

### Type
[InputEncryptedFile](/type/InputEncryptedFile.md)

### Related pages

#### [upload.saveBigFilePart](/method/upload.saveBigFilePart.md)
Saves a part of a large file (over 10 MB in size) to be later passed to one of the methods.