# messageMediaDocument

Document (video, audio, voice, sticker, any media type except photo)

```tl
messageMediaDocument#52d8ccd9 flags:# nopremium:flags.3?true spoiler:flags.4?true video:flags.6?true round:flags.7?true voice:flags.8?true document:flags.0?Document alt_documents:flags.5?Vector<Document> video_cover:flags.9?Photo video_timestamp:flags.10?int ttl_seconds:flags.2?int = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **nopremium** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether this is a normal sticker, if not set this is a premium sticker and a premium sticker animation must be played. |
| **spoiler** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether this media should be hidden behind a spoiler warning |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | Whether this is a video. |
| **round** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Whether this is a round video. |
| **voice** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Whether this is a voice message. |
| **document** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Document](/type/Document.md) | Attached document |
| **alt\_documents** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Videos only, contains alternative qualities of the video. |
| **video\_cover** | [flags](/mtproto/TL-combinators.md#conditional-fields).9?[Photo](/type/Photo.md) | Custom video cover. |
| **video\_timestamp** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[int](/type/int.md) | Start playing the video at the specified timestamp (seconds). |
| **ttl\_seconds** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Time to live of self-destructing document, can be `0` to disable self-destruction, `0x7FFFFFFF` to self-destruct the document immediately after it's played; otherwise self-destructs `ttl_seconds` after it's played. |

### Type
[MessageMedia](/type/MessageMedia.md)