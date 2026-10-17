# WallPaper

Object contains info on a [wallpaper](/api/wallpapers.md).

```tl
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;

---functions---

account.getWallPaper#fc8ddbea wallpaper:InputWallPaper = WallPaper;
account.uploadWallPaper#e39a8f03 flags:# for_chat:flags.0?true file:InputFile mime_type:string settings:WallPaperSettings = WallPaper;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [wallPaper](/constructor/wallPaper.md) | Represents a [wallpaper](/api/wallpapers.md) based on an image. |
| [wallPaperNoFile](/constructor/wallPaperNoFile.md) | Represents a [wallpaper](/api/wallpapers.md) only based on colors/gradients. |

### Methods

| Method | Description |
| --- | --- |
| [account.getWallPaper](/method/account.getWallPaper.md) | Get info about a certain [wallpaper](/api/wallpapers.md) |
| [account.uploadWallPaper](/method/account.uploadWallPaper.md) | Create and upload a new [wallpaper](/api/wallpapers.md) |

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.