# upload.getCdnFileHashes

Get SHA256 hashes for verifying downloaded [CDN](/cdn.md) files

```tl
---functions---
upload.getCdnFileHashes#91dc3f31 file_token:bytes offset:long = Vector<FileHash>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file\_token** | [bytes](/type/bytes.md) | File |
| **offset** | [long](/type/long.md) | Offset from which to start getting hashes |

### Result
[Vector](/type/Vector%20t)&lt;[FileHash](/type/FileHash.md)&gt;

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CDN\_METHOD\_INVALID | You can't call this method in a CDN DC. |
| 400 | FILE\_TOKEN\_INVALID | The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile. |
| 400 | RSA\_DECRYPT\_FAILED | Internal RSA decryption failed. |

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.