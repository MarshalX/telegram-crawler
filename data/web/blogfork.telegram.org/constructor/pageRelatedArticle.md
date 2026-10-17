# pageRelatedArticle

Related article

```tl
pageRelatedArticle#b390dc08 flags:# url:string webpage_id:long title:flags.0?string description:flags.1?string photo_id:flags.2?long author:flags.3?string published_date:flags.4?int = PageRelatedArticle;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **url** | [string](/type/string.md) | URL of article |
| **webpage\_id** | [long](/type/long.md) | Webpage ID of generated IV preview |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Title |
| **description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Description |
| **photo\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | ID of preview photo |
| **author** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Author name |
| **published\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Date of publication |

### Type
[PageRelatedArticle](/type/PageRelatedArticle.md)