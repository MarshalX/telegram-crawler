# upload.reuploadCdnFile

Request a reupload of a certain file to a [CDN DC](/cdn.md).

```tl
---functions---
upload.reuploadCdnFile#9b2754a8 file_token:bytes request_token:bytes = Vector<FileHash>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file\_token** | [bytes](/type/bytes.md) | File token |
| **request\_token** | [bytes](/type/bytes.md) | Request token |

### Result
[Vector](/type/Vector%20t)&lt;[FileHash](/type/FileHash.md)&gt;

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CDN\_METHOD\_INVALID | You can't call this method in a CDN DC. |
| 500 | CDN\_UPLOAD\_TIMEOUT | A server-side timeout occurred while reuploading the file to the CDN DC. |
| 400 | FILE\_TOKEN\_INVALID | The master DC did not accept the `file_token` (e.g., the token has expired). Continue downloading the file from the master DC using upload.getFile. |
| 400 | LOCATION\_INVALID | The provided location is invalid. |
| 400 | REQUEST\_TOKEN\_INVALID | The master DC did not accept the `request_token` from the CDN DC. Continue downloading the file from the master DC using upload.getFile. |
| 400 | RSA\_DECRYPT\_FAILED | Internal RSA decryption failed. |

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.