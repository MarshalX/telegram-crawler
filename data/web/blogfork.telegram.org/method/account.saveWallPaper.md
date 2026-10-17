# account.saveWallPaper

Install/uninstall [wallpaper](/api/wallpapers.md)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.saveWallPaper#6c5a5b37 wallpaper:InputWallPaper unsave:Bool settings:WallPaperSettings = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **wallpaper** | [InputWallPaper](/type/InputWallPaper.md) | [Wallpaper](/api/wallpapers.md) to install or uninstall |
| **unsave** | [Bool](/type/Bool.md) | Uninstall wallpaper? |
| **settings** | [WallPaperSettings](/type/WallPaperSettings.md) | Wallpaper settings |

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