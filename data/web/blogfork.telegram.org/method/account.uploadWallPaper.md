# account.uploadWallPaper

Create and upload a new [wallpaper](/api/wallpapers.md)

```tl
wallPaper#a437c3ed id:long flags:# creator:flags.0?true default:flags.1?true pattern:flags.3?true dark:flags.4?true access_hash:long slug:string document:Document settings:flags.2?WallPaperSettings = WallPaper;
wallPaperNoFile#e0804116 id:long flags:# default:flags.1?true dark:flags.4?true settings:flags.2?WallPaperSettings = WallPaper;
---functions---
account.uploadWallPaper#e39a8f03 flags:# for_chat:flags.0?true file:InputFile mime_type:string settings:WallPaperSettings = WallPaper;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **for\_chat** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag when uploading wallpapers to be passed to [messages.setChatWallPaper](/method/messages.setChatWallPaper.md). |
| **file** | [InputFile](/type/InputFile.md) | The JPG/PNG wallpaper |
| **mime\_type** | [string](/type/string.md) | MIME type of uploaded wallpaper |
| **settings** | [WallPaperSettings](/type/WallPaperSettings.md) | Wallpaper settings |

### Result
[WallPaper](/type/WallPaper.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | WALLPAPER\_FILE\_INVALID | The specified wallpaper file is invalid. |
| 400 | WALLPAPER\_MIME\_INVALID | The specified wallpaper MIME type is invalid. |

### Related pages

#### [messages.setChatWallPaper](/method/messages.setChatWallPaper.md)
Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.