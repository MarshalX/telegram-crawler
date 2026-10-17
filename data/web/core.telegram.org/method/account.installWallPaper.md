# account.installWallPaper

Install [wallpaper](/api/wallpapers.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.installWallPaper#feed5769 wallpaper:InputWallPaper settings:WallPaperSettings = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **wallpaper** | [InputWallPaper](/type/InputWallPaper.md) | [Wallpaper](/api/wallpapers.md) to install |
| **settings** | [WallPaperSettings](/type/WallPaperSettings.md) | [Wallpaper](/api/wallpapers.md) settings |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | WALLPAPER\_INVALID | The specified wallpaper is invalid. |

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.