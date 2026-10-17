# upload.getFileHashes

Get SHA256 hashes for verifying downloaded files

```tl
---functions---
upload.getFileHashes#9156982a location:InputFileLocation offset:long = Vector<FileHash>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **location** | [InputFileLocation](/type/InputFileLocation.md) | File |
| **offset** | [long](/type/long.md) | Offset from which to get file hashes |

### Result
[Vector](/type/Vector%20t)&lt;[FileHash](/type/FileHash.md)&gt;

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | LOCATION\_INVALID | The provided location is invalid. |