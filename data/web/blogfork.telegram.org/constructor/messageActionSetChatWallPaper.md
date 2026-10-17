# messageActionSetChatWallPaper

The [wallpaper »](/api/wallpapers.md) of the current chat was changed.

```tl
messageActionSetChatWallPaper#5060a3f4 flags:# same:flags.0?true for_both:flags.1?true wallpaper:WallPaper = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **same** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, indicates the user applied a [wallpaper »](/api/wallpapers.md) previously sent by the other user in a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) message. |
| **for\_both** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, indicates the wallpaper was forcefully applied for both sides, without explicit confirmation from the other side. \
If the message is incoming, and we did not like the new wallpaper the other user has chosen for us, we can re-set our previous wallpaper just on our side, by invoking [messages.setChatWallPaper](/method/messages.setChatWallPaper.md), providing only the `revert` flag (and obviously the `peer` parameter). |
| **wallpaper** | [WallPaper](/type/WallPaper.md) | New [wallpaper](/api/wallpapers.md) |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md)
The [wallpaper »](/api/wallpapers.md) of the current chat was changed.

#### [messages.setChatWallPaper](/method/messages.setChatWallPaper.md)
Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user.