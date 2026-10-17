# account.getWallPaper

Get info about a certain [wallpaper](/api/wallpapers.md)

```tl
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;
---functions---
account.getWallPaper#fc8ddbea wallpaper:InputWallPaper = WallPaper;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **wallpaper** | [InputWallPaper](/type/InputWallPaper.md) | The [wallpaper](/api/wallpapers.md) to get info about |

### Result
[WallPaper](/type/WallPaper.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | WALLPAPER\_INVALID | The specified wallpaper is invalid. |

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.