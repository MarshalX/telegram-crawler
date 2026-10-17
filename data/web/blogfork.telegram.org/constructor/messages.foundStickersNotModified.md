# messages.foundStickersNotModified

No new stickers were found for the specified query

```tl
messages.foundStickersNotModified#6010c534 flags:# next_offset:flags.0?int = messages.FoundStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Offset for [pagination](/api/offsets.md) |

### Type
[messages.FoundStickers](/type/messages.FoundStickers.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.