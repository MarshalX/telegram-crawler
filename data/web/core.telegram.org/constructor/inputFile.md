# inputFile

Defines a file saved in parts using the method [upload.saveFilePart](/method/upload.saveFilePart.md).

```tl
inputFile#f52ff27f id:long parts:int name:string md5_checksum:string = InputFile;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Random file identifier created by the client |
| **parts** | [int](/type/int.md) | Number of parts saved |
| **name** | [string](/type/string.md) | Full name of the file |
| **md5\_checksum** | [string](/type/string.md) | In case the file's [md5-hash](https://en.wikipedia.org/wiki/MD5#MD5_hashes) was passed, contents of the file will be checked prior to use |

### Type
[InputFile](/type/InputFile.md)

### Related pages

#### [upload.saveFilePart](/method/upload.saveFilePart.md)
Saves a part of file for further sending to one of the methods.