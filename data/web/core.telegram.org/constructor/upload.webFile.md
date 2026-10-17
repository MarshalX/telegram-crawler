# upload.webFile

Represents a chunk of an [HTTP webfile](/api/files.md) downloaded through telegram's secure MTProto servers

```tl
upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **size** | [int](/type/int.md) | File size |
| **mime\_type** | [string](/type/string.md) | Mime type |
| **file\_type** | [storage.FileType](/type/storage.FileType.md) | File type |
| **mtime** | [int](/type/int.md) | Modified time |
| **bytes** | [bytes](/type/bytes.md) | Data |

### Type
[upload.WebFile](/type/upload.WebFile.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.