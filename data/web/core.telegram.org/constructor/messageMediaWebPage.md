# messageMediaWebPage

Preview of webpage

```tl
messageMediaWebPage#ddf10c3b flags:# force_large_media:flags.0?true force_small_media:flags.1?true manual:flags.3?true safe:flags.4?true webpage:WebPage = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **force\_large\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, specifies that a large media preview should be used. |
| **force\_small\_media** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, specifies that a small media preview should be used. |
| **manual** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, indicates that the URL used for the webpage preview was specified manually using [inputMediaWebPage](/constructor/inputMediaWebPage.md), and may not be related to any of the URLs specified in the message. |
| **safe** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, the webpage can be opened directly without user confirmation; otherwise, user confirmation is required, showing the exact URL that will be opened. |
| **webpage** | [WebPage](/type/WebPage.md) | Webpage preview |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [inputMediaWebPage](/constructor/inputMediaWebPage.md)
Specifies options that will be used to generate the link preview for the caption, or even a standalone link preview without an attached message.