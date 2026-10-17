# account.getMultiWallPapers

Get info about multiple [wallpapers](/api/wallpapers.md)

```tl
---functions---
account.getMultiWallPapers#65ad71dc wallpapers:Vector<InputWallPaper> = Vector<WallPaper>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **wallpapers** | [Vector](/type/Vector%20t)&lt;[InputWallPaper](/type/InputWallPaper.md)&gt; | [Wallpapers](/api/wallpapers.md) to fetch info about |

### Result
[Vector](/type/Vector%20t)&lt;[WallPaper](/type/WallPaper.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | WALLPAPER\_INVALID | The specified wallpaper is invalid. |

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.