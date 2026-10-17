# inputWallPaperNoFile

[Wallpaper](/api/wallpapers.md) with no file access hash, used for example when deleting (`unsave=true`) wallpapers using [account.saveWallPaper](/method/account.saveWallPaper.md), specifying just the wallpaper ID.

```tl
inputWallPaperNoFile#967a462e id:long = InputWallPaper;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Wallpaper ID |

### Type
[InputWallPaper](/type/InputWallPaper.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [account.saveWallPaper](/method/account.saveWallPaper.md)
Install/uninstall [wallpaper](/api/wallpapers.md)