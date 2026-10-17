# inputMediaPhotoExternal

New photo that will be uploaded by the server using the specified URL

```tl
inputMediaPhotoExternal#e5bbfe1a flags:# spoiler:flags.1?true url:string ttl_seconds:flags.0?int = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **url** | [string](/type/string.md) | URL of the photo |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Time to live of self-destructing photo, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the photo immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |

### Type
[InputMedia](/type/InputMedia.md)