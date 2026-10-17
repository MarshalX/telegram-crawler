# inputMediaDocumentExternal

Document that will be downloaded by the telegram servers

```tl
inputMediaDocumentExternal#779600f9 flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int video_cover:flags.2?InputPhoto video_timestamp:flags.3?int = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **url** | [string](/type/string.md) | URL of the document |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Time to live of self-destructing document, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the document immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |
| **video\_cover** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputPhoto](/type/InputPhoto.md) | Custom video cover. |
| **video\_timestamp** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Start playing the video at the specified timestamp (seconds). |

### Type
[InputMedia](/type/InputMedia.md)