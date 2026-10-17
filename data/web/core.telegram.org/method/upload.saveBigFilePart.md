# upload.saveBigFilePart

Saves a part of a large file (over 10 MB in size) to be later passed to one of the methods.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
upload.saveBigFilePart#de7b673d file_id:long file_part:int file_total_parts:int bytes:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file\_id** | [long](/type/long.md) | Random file id, created by the client |
| **file\_part** | [int](/type/int.md) | Part sequence number |
| **file\_total\_parts** | [int](/type/int.md) | Total number of parts |
| **bytes** | [bytes](/type/bytes.md) | Binary data, part contents |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | FILE\_PART\_EMPTY | The provided file part is empty. |
| 400 | FILE\_PART\_INVALID | The file part number is invalid. |
| 400 | FILE\_PART\_SIZE\_CHANGED | Provided file part size has changed. |
| 400 | FILE\_PART\_SIZE\_INVALID | The provided file part size is invalid. |
| 400 | FILE\_PART\_TOO\_BIG | The uploaded file part is too big. |
| 400 | FILE\_PART\_TOO\_SMALL | The size of the uploaded file part is too small, please see the documentation for the allowed sizes. |