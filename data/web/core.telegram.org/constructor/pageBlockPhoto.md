# pageBlockPhoto

A photo

```tl
pageBlockPhoto#1759c560 flags:# photo_id:long caption:PageCaption url:flags.0?string webpage_id:flags.0?long = PageBlock;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **photo\_id** | [long](/type/long.md) | Photo ID |
| **caption** | [PageCaption](/type/PageCaption.md) | Caption |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | HTTP URL of page the photo leads to when clicked |
| **webpage\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of preview of the page the photo leads to when clicked |

### Type
[PageBlock](/type/PageBlock.md)