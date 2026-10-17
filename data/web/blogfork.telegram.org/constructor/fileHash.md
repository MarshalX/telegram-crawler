# FileHash

SHA256 Hash of an uploaded file, to be checked for validity after download

```tl
fileHash#f39b035c offset:long limit:int hash:bytes = FileHash;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **offset** | [long](/type/long.md) | Offset from where to start computing SHA-256 hash |
| **limit** | [int](/type/int.md) | Length |
| **hash** | [bytes](/type/bytes.md) | SHA-256 Hash of file chunk, to be checked for validity after download |

### Type
[FileHash](/type/FileHash.md)