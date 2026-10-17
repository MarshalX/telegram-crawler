# messageMediaPhoto

Attached photo.

```tl
messageMediaPhoto#e216eb63 flags:# spoiler:flags.3?true live_photo:flags.4?true photo:flags.0?Photo ttl_seconds:flags.2?int video:flags.4?Document = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **live\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this is a live photo, i.e. a still photo paired with the short `video` clip captured alongside it |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Photo](/type/Photo.md) | Photo |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Time to live of self-destructing photo, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the photo immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Document](/type/Document.md) | The short video clip of the live photo |

### Type
[MessageMedia](/type/MessageMedia.md)