# account.getWallPapers

Returns a list of available [wallpapers](/api/wallpapers.md).

```tl
account.wallPapersNotModified#1c199183 = account.WallPapers;
account.wallPapers#cdc3858c hash:long wallpapers:Vector<WallPaper> = account.WallPapers;
---functions---
account.getWallPapers#7967d36 hash:long = account.WallPapers;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[account.WallPapers](/type/account.WallPapers.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.