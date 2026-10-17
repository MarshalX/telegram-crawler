# inputDocumentFileLocation

Document location (video, voice, audio, basically every type except photo)

```tl
inputDocumentFileLocation#bad07584 id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Document ID |
| **access\_hash** | [long](/type/long.md) | **access\_hash** parameter from the [document](/constructor/document.md) constructor |
| **file\_reference** | [bytes](/type/bytes.md) | [File reference](/api/file-references.md) |
| **thumb\_size** | [string](/type/string.md) | Thumbnail size to download the thumbnail |

### Type
[InputFileLocation](/type/InputFileLocation.md)

### Related pages

#### [document](/constructor/document.md)
Document

#### [File references](/api/file-references.md)
How to handle file references.