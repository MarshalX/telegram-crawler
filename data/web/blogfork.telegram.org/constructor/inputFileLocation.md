# inputFileLocation

DEPRECATED location of a photo

```tl
inputFileLocation#dfdaabe1 volume_id:long local_id:int secret:long file_reference:bytes = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **volume\_id** | [long](/type/long.md) | Server volume |
| **local\_id** | [int](/type/int.md) | File identifier |
| **secret** | [long](/type/long.md) | Check sum to access the file |
| **file\_reference** | [bytes](/type/bytes.md) | [File reference](/api/file-references.md) |

### Type
[InputFileLocation](/type/InputFileLocation.md)

### Related pages

#### [File references](/api/file-references.md)
How to handle file references.