# inputMediaDocument

Forwarded document

```tl
inputMediaDocument#a8763ab5 flags:# spoiler:flags.2?true id:InputDocument video_cover:flags.3?InputPhoto video_timestamp:flags.4?int ttl_seconds:flags.0?int query:flags.1?string = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **id** | [InputDocument](/type/InputDocument.md) | The document to be forwarded. |
| **video\_cover** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[InputPhoto](/type/InputPhoto.md) | Custom video cover. |
| **video\_timestamp** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Start playing the video at the specified timestamp (seconds). |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Time to live of self-destructing document, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the document immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |
| **query** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Text query or emoji that was used by the user to find this sticker or GIF: used to improve search result relevance. |

### Type
[InputMedia](/type/InputMedia.md)