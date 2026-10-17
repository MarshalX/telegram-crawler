# pageBlockVideo

Video

```tl
pageBlockVideo#7c8fe7b6 flags:# autoplay:flags.0?true loop:flags.1?true video_id:long caption:PageCaption = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **autoplay** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the video is set to autoplay |
| **loop** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the video is set to loop |
| **video\_id** | [long](/type/long.md) | Video ID |
| **caption** | [PageCaption](/type/PageCaption.md) | Caption |

### Type
[PageBlock](/type/PageBlock.md)