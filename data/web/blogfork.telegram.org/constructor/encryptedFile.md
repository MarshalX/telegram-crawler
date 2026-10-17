# encryptedFile

Encrypted file.

```tl
encryptedFile#a8008cd8 id:long access_hash:long size:long dc_id:int key_fingerprint:int = EncryptedFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | File ID |
| **access\_hash** | [long](/type/long.md) | Checking sum depending on user ID |
| **size** | [long](/type/long.md) | File size in bytes |
| **dc\_id** | [int](/type/int.md) | Number of data center |
| **key\_fingerprint** | [int](/type/int.md) | 32-bit fingerprint of key used for file encryption |

### Type
[EncryptedFile](/type/EncryptedFile.md)