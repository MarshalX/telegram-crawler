# account.getThemes

Get installed themes

```tl
account.themesNotModified#f41eb622 = account.Themes;
account.themes#9a3d8c6d hash:long themes:Vector<Theme> = account.Themes;
---functions---
account.getThemes#7206e458 format:string hash:long = account.Themes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **format** | [string](/type/string.md) | Theme format, a string that identifies the theming engines supported by the client |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[account.Themes](/type/account.Themes.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.