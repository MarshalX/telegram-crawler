# inputMediaPhoto

Forwarded photo

```tl
inputMediaPhoto#e3af4434 flags:# spoiler:flags.1?true live_photo:flags.2?true id:InputPhoto ttl_seconds:flags.0?int video:flags.2?InputDocument = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **live\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is a live photo, i.e. a still photo paired with the short `video` clip captured alongside it |
| **id** | [InputPhoto](/type/InputPhoto.md) | Photo to be forwarded |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Time to live of self-destructing photo, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the document immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[InputDocument](/type/InputDocument.md) | The short video clip of the live photo |

### Type
[InputMedia](/type/InputMedia.md)