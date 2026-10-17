# upload.saveFilePart

Saves a part of file for further sending to one of the methods.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
upload.saveFilePart#b304a621 file_id:long file_part:int bytes:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **file\_id** | [long](/type/long.md) | Random file identifier created by the client |
| **file\_part** | [int](/type/int.md) | Numerical order of a part |
| **bytes** | [bytes](/type/bytes.md) | Binary data, content of a part |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILE\_PART\_EMPTY | The provided file part is empty. |
| 400 | FILE\_PART\_INVALID | The file part number is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |