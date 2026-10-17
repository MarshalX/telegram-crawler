# inputEncryptedFileUploaded

Sets new encrypted file saved by parts using upload.saveFilePart method.

```tl
inputEncryptedFileUploaded#64bd0306 id:long parts:int md5_checksum:string key_fingerprint:int = InputEncryptedFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Random file ID created by client |
| **parts** | [int](/type/int.md) | Number of saved parts |
| **md5\_checksum** | [string](/type/string.md) | In case [md5-HASH](https://en.wikipedia.org/wiki/MD5) of the (already encrypted) file was transmitted, file content will be checked prior to use |
| **key\_fingerprint** | [int](/type/int.md) | 32-bit fingerprint of the key used to encrypt a file |

### Type
[InputEncryptedFile](/type/InputEncryptedFile.md)