# InputWallPaper

[Wallpaper](/api/wallpapers.md)

```tl
inputWallPaper#e630b979 id:long access_hash:long = InputWallPaper;
inputWallPaperSlug#72091c80 slug:string = InputWallPaper;
inputWallPaperNoFile#967a462e id:long = InputWallPaper;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [inputWallPaper](/constructor/inputWallPaper.md) | [Wallpaper](/api/wallpapers.md) |
| [inputWallPaperSlug](/constructor/inputWallPaperSlug.md) | [Wallpaper](/api/wallpapers.md) by slug (a unique ID, obtained from a [wallpaper link »](/api/links.md#wallpaper-links)) |
| [inputWallPaperNoFile](/constructor/inputWallPaperNoFile.md) | [Wallpaper](/api/wallpapers.md) with no file access hash, used for example when deleting (`unsave=true`) wallpapers using [account.saveWallPaper](/method/account.saveWallPaper.md), specifying just the wallpaper ID. |

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.