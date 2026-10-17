# messages.foundStickers

Found stickers

```tl
messages.foundStickers#82c9e290 flags:# next_offset:flags.0?int hash:long stickers:Vector<Document> = messages.FoundStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Offset for [pagination](/api/offsets.md) |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **stickers** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Found stickers |

### Type
[messages.FoundStickers](/type/messages.FoundStickers.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.