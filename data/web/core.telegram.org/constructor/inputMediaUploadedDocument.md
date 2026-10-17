# inputMediaUploadedDocument

New document

```tl
inputMediaUploadedDocument#37c9330 flags:# nosound_video:flags.3?true force_file:flags.4?true spoiler:flags.5?true file:InputFile thumb:flags.2?InputFile mime_type:string attributes:Vector<DocumentAttribute> stickers:flags.0?Vector<InputDocument> video_cover:flags.6?InputPhoto video_timestamp:flags.7?int ttl_seconds:flags.1?int = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **nosound\_video** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether to send the file as a video even if it doesn't have an audio track (i.e. if set, the [documentAttributeAnimated](/constructor/documentAttributeAnimated.md) attribute will **not** be set even for videos without audio) |
| **force\_file** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Force the media file to be uploaded as document |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **file** | [InputFile](/type/InputFile.md) | The [uploaded file](/api/files.md) |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputFile](/type/InputFile.md) | Thumbnail of the document, uploaded as for the file |
| **mime\_type** | [string](/type/string.md) | MIME type of document |
| **attributes** | [Vector](/type/Vector%20t)&lt;[DocumentAttribute](/type/DocumentAttribute.md)&gt; | Attributes that specify the type of the document (video, audio, voice, sticker, etc.) |
| **stickers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[InputDocument](/type/InputDocument.md)&gt; | Attached stickers |
| **video\_cover** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[InputPhoto](/type/InputPhoto.md) | Start playing the video at the specified timestamp (seconds). |
| **video\_timestamp** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[int](/type/int.md) | Start playing the video at the specified timestamp (seconds). |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Time to live of self-destructing document, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the document immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |

### Type
[InputMedia](/type/InputMedia.md)

### Related pages

#### [documentAttributeAnimated](/constructor/documentAttributeAnimated.md)
Defines an animated GIF

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.