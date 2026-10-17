# inputFileBig

Assigns a big file (over 10 MB in size), saved in part using the method [upload.saveBigFilePart](/method/upload.saveBigFilePart.md).

```tl
inputFileBig#fa4f0bb5 id:long parts:int name:string = InputFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Random file id, created by the client |
| **parts** | [int](/type/int.md) | Number of parts saved |
| **name** | [string](/type/string.md) | Full file name |

### Type
[InputFile](/type/InputFile.md)

### Related pages

#### [upload.saveBigFilePart](/method/upload.saveBigFilePart.md)
Saves a part of a large file (over 10 MB in size) to be later passed to one of the methods.