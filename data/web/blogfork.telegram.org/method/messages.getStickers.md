# messages.getStickers

Get stickers by emoji

```tl
messages.stickersNotModified#f1749a22 = messages.Stickers;
messages.stickers#30a6ec7e hash:long stickers:Vector<Document> = messages.Stickers;
---functions---
messages.getStickers#d5a5d3a1 emoticon:string hash:long = messages.Stickers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **emoticon** | [string](/type/string.md) | The emoji |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[messages.Stickers](/type/messages.Stickers.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | EMOTICON\_EMPTY | The emoji is empty. |

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.