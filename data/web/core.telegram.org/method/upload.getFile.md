# upload.getFile

Returns content of a whole file or its part.

```tl
upload.file#96a18d5 type:storage.FileType mtime:int bytes:bytes = upload.File;
upload.fileCdnRedirect#f18cda44 dc_id:int file_token:bytes encryption_key:bytes encryption_iv:bytes file_hashes:Vector<FileHash> = upload.File;
---functions---
upload.getFile#be5335be flags:# precise:flags.0?true cdn_supported:flags.1?true location:InputFileLocation offset:long limit:int = upload.File;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **precise** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Disable some checks on limit and offset values, useful for example to stream videos by keyframes |
| **cdn\_supported** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the current client supports [CDN downloads](/cdn.md) |
| **location** | [InputFileLocation](/type/InputFileLocation.md) | File location |
| **offset** | [long](/type/long.md) | Number of bytes to be skipped |
| **limit** | [int](/type/int.md) | Number of bytes to be returned |

### Result
[upload.File](/type/upload.File.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CDN\_METHOD\_INVALID | You can't call this method in a CDN DC. |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 406 | FILEREF\_UPGRADE\_NEEDED | The client has to be updated in order to support [file references](/api/file-references.md). |
| 400 | FILE\_ID\_INVALID | The provided file id is invalid. |
| 400 | FILE\_REFERENCE\_EMPTY | An empty [file reference](/api/file-references.md) was specified. |
| 400 | FILE\_REFERENCE\_EXPIRED | File reference expired, it must be refetched as described in [the documentation](/api/file-references.md). |
| 400 | FILE\_REFERENCE\_INVALID | The specified [file reference](/api/file-references.md) is invalid. |
| 420 | FLOOD\_PREMIUM\_WAIT\_%d | Please wait %d seconds before repeating the action, or purchase a [Telegram Premium subscription](/api/premium.md) to remove this rate limit. |
| 400 | LIMIT\_INVALID | The provided limit is invalid. |
| 400 | LOCATION\_INVALID | The provided location is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | OFFSET\_INVALID | The provided offset is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Encrypted CDNs for Speed and Security](/cdn.md)
How client apps download popular public files from secondary CDN data centers.

#### [File references](/api/file-references.md)
How to handle file references.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.