# upload.getCdnFile

Download a [CDN](/cdn.md) file.

```tl
upload.cdnFileReuploadNeeded#eea8e46e request_token:bytes = upload.CdnFile;
upload.cdnFile#a99fca4f bytes:bytes = upload.CdnFile;
---functions---
upload.getCdnFile#395f69da file_token:bytes offset:long limit:int = upload.CdnFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file\_token** | [bytes](/type/bytes.md) | File token |
| **offset** | [long](/type/long.md) | Offset of chunk to download |
| **limit** | [int](/type/int.md) | Length of chunk to download |

### Result
[upload.CdnFile](/type/upload.CdnFile.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILE\_TOKEN\_INVALID | The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile. |
| 404 | METHOD\_INVALID | The specified method is invalid. |

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.