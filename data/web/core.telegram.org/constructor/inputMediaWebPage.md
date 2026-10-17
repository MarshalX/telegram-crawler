# inputMediaWebPage

Specifies options that will be used to generate the link preview for the caption, or even a standalone link preview without an attached message.

```tl
inputMediaWebPage#c21b8849 flags:# force_large_media:flags.0?true force_small_media:flags.1?true optional:flags.2?true url:string = InputMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **force\_large\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, specifies that a large media preview should be used. |
| **force\_small\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, specifies that a small media preview should be used. |
| **optional** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If **not** set, a `WEBPAGE_NOT_FOUND` RPC error will be emitted if a webpage preview cannot be generated for the specified `url`; otherwise, no error will be emitted (unless the provided message is also empty, in which case a `MESSAGE_EMPTY` will be emitted, instead). |
| **url** | [string](/type/string.md) | The URL to use for the link preview. |

### Type
[InputMedia](/type/InputMedia.md)