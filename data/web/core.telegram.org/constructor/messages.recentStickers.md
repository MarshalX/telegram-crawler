# messages.recentStickers

Recently used stickers

```tl
messages.recentStickers#88d37c56 hash:long packs:Vector<StickerPack> stickers:Vector<Document> dates:Vector<int> = messages.RecentStickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |
| **packs** | [Vector](/type/Vector%20t)&lt;[StickerPack](/type/StickerPack.md)&gt; | Emojis associated to stickers |
| **stickers** | [Vector](/type/Vector%20t)&lt;[Document](/type/Document.md)&gt; | Recent stickers |
| **dates** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | When was each sticker last used |

### Type
[messages.RecentStickers](/type/messages.RecentStickers.md)

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.