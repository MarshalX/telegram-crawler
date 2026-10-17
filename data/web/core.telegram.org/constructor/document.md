# document

Document

```tl
document#8fd4c4d8 flags:# id:long access_hash:long file_reference:bytes date:int mime_type:string size:long thumbs:flags.0?Vector<PhotoSize> video_thumbs:flags.1?Vector<VideoSize> dc_id:int attributes:Vector<DocumentAttribute> = Document;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **id** | [long](/type/long.md) | Document ID |
| **access\_hash** | [long](/type/long.md) | Check sum, dependent on document ID |
| **file\_reference** | [bytes](/type/bytes.md) | [File reference](/api/file-references.md) |
| **date** | [int](/type/int.md) | Creation date |
| **mime\_type** | [string](/type/string.md) | MIME type |
| **size** | [long](/type/long.md) | Size |
| **thumbs** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[PhotoSize](/type/PhotoSize.md)&gt; | Thumbnails |
| **video\_thumbs** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[VideoSize](/type/VideoSize.md)&gt; | Video thumbnails |
| **dc\_id** | [int](/type/int.md) | DC ID |
| **attributes** | [Vector](/type/Vector%20t)&lt;[DocumentAttribute](/type/DocumentAttribute.md)&gt; | Attributes |

### Type
[Document](/type/Document.md)

### Related pages

#### [File references](/api/file-references.md)
How to handle file references.