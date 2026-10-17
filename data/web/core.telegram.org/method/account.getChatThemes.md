# account.getChatThemes

Get all available chat [themes »](/api/themes.md).

```tl
account.themesNotModified#f41eb622 = account.Themes;
account.themes#9a3d8c6d hash:long themes:Vector<Theme> = account.Themes;
---functions---
account.getChatThemes#d638de89 hash:long = account.Themes;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation). |

### Result
[account.Themes](/type/account.Themes.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Telegram themes](/api/themes.md)
Telegram apps support generating, sharing and synchronizing app themes.