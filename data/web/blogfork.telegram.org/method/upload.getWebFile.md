# upload.getWebfile

Returns content of a web file, by proxying the request through telegram, see the [webfile docs for more info](/api/files.md#downloading-webfiles).

**Note**: the query must be sent to the DC specified in the `webfile_dc_id` [MTProto configuration field](/api/config.md#mtproto-configuration).

```tl
upload.webFile#21e753bc size:int mime_type:string file_type:storage.FileType mtime:int bytes:bytes = upload.WebFile;
---functions---
upload.getWebFile#24e6818d location:InputWebFileLocation offset:int limit:int = upload.WebFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **location** | [InputWebFileLocation](/type/InputWebFileLocation.md) | The file to download |
| **offset** | [int](/type/int.md) | Number of bytes to be skipped |
| **limit** | [int](/type/int.md) | Number of bytes to be returned |

### Result
[upload.WebFile](/type/upload.WebFile.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 400 | LOCATION\_INVALID | The provided location is invalid. |

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.