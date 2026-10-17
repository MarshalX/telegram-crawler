# inputMediaUploadedPhoto

Photo

```tl
inputMediaUploadedPhoto#7d8375da flags:# spoiler:flags.2?true live_photo:flags.3?true file:InputFile stickers:flags.0?Vector<InputDocument> ttl_seconds:flags.1?int video:flags.3?InputDocument = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **live\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a live photo, i.e. a still photo paired with the short `video` clip captured alongside it |
| **file** | [InputFile](/type/InputFile.md) | The [uploaded file](/api/files.md) |
| **stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[InputDocument](/type/InputDocument.md)&gt; | Attached mask stickers |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Time to live of self-destructing photo, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the photo immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InputDocument](/type/InputDocument.md) | The short video clip of the live photo |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.