# updatePeerWallpaper

The [wallpaper »](/api/wallpapers.md) of a given peer has changed.

```tl
updatePeerWallpaper#ae3f101d flags:# wallpaper_overridden:flags.1?true peer:Peer wallpaper:flags.0?WallPaper = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **wallpaper\_overridden** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the other user has chosen a custom wallpaper for us using [messages.setChatWallPaper](/method/messages.setChatWallPaper.md) and the `for_both` flag, see [here »](/api/wallpapers.md#installing-wallpapers-in-a-specific-chat-or-channel) for more info. |
| **peer** | [Peer](/type/Peer.md) | The peer where the wallpaper has changed. |
| **wallpaper** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[WallPaper](/type/WallPaper.md) | The new wallpaper, if none the wallpaper was removed and the default wallpaper should be used. |

### Type
[Update](/type/Update.md)

### Related pages

#### [messages.setChatWallPaper](/method/messages.setChatWallPaper.md)
Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.