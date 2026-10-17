# inputPhotoFileLocation

Use this object to download a photo with [upload.getFile](/method/upload.getFile.md) method

```tl
inputPhotoFileLocation#40181ffe id:long access_hash:long file_reference:bytes thumb_size:string = InputFileLocation;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Photo ID, obtained from the [photo](/constructor/photo.md) object |
| **access\_hash** | [long](/type/long.md) | Photo's access hash, obtained from the [photo](/constructor/photo.md) object |
| **file\_reference** | [bytes](/type/bytes.md) | [File reference](/api/file-references.md) |
| **thumb\_size** | [string](/type/string.md) | The [PhotoSize](/type/PhotoSize.md) to download: must be set to the `type` field of the desired PhotoSize object of the [photo](/constructor/photo.md) |

### Type
[InputFileLocation](/type/InputFileLocation.md)

### Related pages

#### [photo](/constructor/photo.md)
Photo

#### [File references](/api/file-references.md)
How to handle file references.

#### [PhotoSize](/type/PhotoSize.md)
Location of a certain size of a picture

#### [upload.getFile](/method/upload.getFile.md)
Returns content of a whole file or its part.