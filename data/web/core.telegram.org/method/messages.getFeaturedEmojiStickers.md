# messages.getFeaturedEmojiStickers

Gets featured custom emoji stickersets.

```tl
messages.featuredStickersNotModified#c6dc0c66 count:int = messages.FeaturedStickers;
messages.featuredStickers#be382906 flags:# premium:flags.0?true hash:long count:int sets:Vector<StickerSetCovered> unread:Vector<long> = messages.FeaturedStickers;
---functions---
messages.getFeaturedEmojiStickers#ecf6736 hash:long = messages.FeaturedStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.FeaturedStickers](/type/messages.FeaturedStickers.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.