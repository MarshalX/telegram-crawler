# documentAttributeVideo

Defines a video

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===23===
documentAttributeVideo#5910cccb duration:int w:int h:int = DocumentAttribute;

===66===
documentAttributeVideo#0ef02ce6 flags:# duration:int w:int h:int = DocumentAttribute;
```

#### API schema
<!-- /schema-blocks -->

```tl
documentAttributeVideo#43c57c48 flags:# round_message:flags.0?true supports_streaming:flags.1?true nosound:flags.3?true duration:double w:int h:int preload_prefix_size:flags.2?int video_start_ts:flags.4?double video_codec:flags.5?string = DocumentAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **round\_message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this is a round video |
| **supports\_streaming** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the video supports streaming |
| **nosound** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the specified document is a video file with no audio tracks |
| **duration** | [double](/type/double.md) | Duration in seconds |
| **w** | [int](/type/int.md) | Video width |
| **h** | [int](/type/int.md) | Video height |
| **preload\_prefix\_size** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Number of bytes to preload when preloading videos (particularly [video stories](/api/stories.md)). |
| **video\_start\_ts** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[double](/type/double.md) | Floating point UNIX timestamp in seconds, indicating the frame of the video that should be used as static preview and thumbnail. |
| **video\_codec** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | Codec used for the video, i.e. "h264", "h265", or "av1" |

### Type
[DocumentAttribute](/type/DocumentAttribute.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.