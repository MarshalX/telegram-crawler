# photo

Photo

```tl
photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the photo has mask stickers attached to it |
| **id** | [long](/type/long.md) | ID |
| **access\_hash** | [long](/type/long.md) | Access hash |
| **file\_reference** | [bytes](/type/bytes.md) | [file reference](/api/file-references.md) |
| **date** | [int](/type/int.md) | Date of upload |
| **sizes** | [Vector](/type/Vector%20t)&lt;[PhotoSize](/type/PhotoSize.md)&gt; | Available sizes for download |
| **video\_sizes** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[VideoSize](/type/VideoSize.md)&gt; | [For animated profiles](/api/files.md#animated-profile-pictures), the MPEG4 videos |
| **dc\_id** | [int](/type/int.md) | DC ID to use for download |

### Type
[Photo](/type/Photo.md)

### Related pages

#### [File references](/api/file-references.md)
How to handle file references.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.