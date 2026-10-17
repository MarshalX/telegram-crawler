# upload.fileCdnRedirect

The file must be downloaded from a [CDN DC](/cdn.md).

```tl
upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dc\_id** | [int](/type/int.md) | [CDN DC](/cdn.md) ID |
| **file\_token** | [bytes](/type/bytes.md) | File token (see [CDN files](/cdn.md)) |
| **encryption\_key** | [bytes](/type/bytes.md) | Encryption key (see [CDN files](/cdn.md)) |
| **encryption\_iv** | [bytes](/type/bytes.md) | Encryption IV (see [CDN files](/cdn.md)) |
| **file\_hashes** | [Vector](/type/Vector%20t)&lt;[FileHash](/type/FileHash.md)&gt; | File hashes (see [CDN files](/cdn.md)) |

### Type
[upload.File](/type/upload.File.md)

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.