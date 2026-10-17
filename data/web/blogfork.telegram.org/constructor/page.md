# page

[Instant view](https://instantview.telegram.org) page

```tl
page#98657f0d flags:# part:flags.0?true rtl:flags.1?true v2:flags.2?true url:string blocks:Vector<PageBlock> photos:Vector<Photo> documents:Vector<Document> views:flags.3?int = Page;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **part** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Indicates that not full page preview is available to the client and it will need to fetch full Instant View from the server using [messages.getWebPagePreview](/method/messages.getWebPagePreview.md). |
| **rtl** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the page contains RTL text |
| **v2** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this is an [IV v2](https://instantview.telegram.org/docs#what-39s-new-in-2-0) page |
| **url** | [string](/type/string.md) | Original page HTTP URL |
| **blocks** | [Vector](/type/Vector%20t)&lt;[PageBlock](/type/PageBlock.md)&gt; | Page elements (like with HTML elements, only as TL constructors) |
| **photos** | [Vector](/type/Vector%20t)&lt;[Photo](/type/Photo.md)&gt; | Photos in page |
| **documents** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Media in page |
| **views** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | View count |

### Type
[Page](/type/Page.md)

### Related pages

#### [messages.getWebPagePreview](/method/messages.getWebPagePreview.md)
Get preview of webpage