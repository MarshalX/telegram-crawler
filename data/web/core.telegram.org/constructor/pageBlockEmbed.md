# pageBlockEmbed

An embedded webpage

```tl
pageBlockEmbed#a8718dc5 flags:# full_width:flags.0?true allow_scrolling:flags.3?true url:flags.1?string html:flags.2?string poster_photo_id:flags.4?long w:flags.5?int h:flags.5?int caption:PageCaption = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **full\_width** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the block should be full width |
| **allow\_scrolling** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether scrolling should be allowed |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Web page URL, if available |
| **html** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | HTML-markup of the embedded page |
| **poster\_photo\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | Poster photo, if available |
| **w** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Block width, if known |
| **h** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Block height, if known |
| **caption** | [PageCaption](/type/PageCaption.md) | Caption |

### Type
[PageBlock](/type/PageBlock.md)