# messages.setChatWallPaper

Set a custom [wallpaper »](/api/wallpapers.md) in a specific private chat with another user.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.setChatWallPaper#8ffacae1 flags:# for_both:flags.3?true revert:flags.4?true peer:InputPeer wallpaper:flags.0?InputWallPaper settings:flags.2?WallPaperSettings id:flags.1?int = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **for\_both** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Only for [Premium](/api/premium.md) users, sets the specified wallpaper for both users of the chat, without requiring confirmation from the other user. |
| **revert** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If we don't like the new wallpaper the other user of the chat has chosen for us using the `for_both` flag, we can re-set our previous wallpaper just on our side using this flag. |
| **peer** | [InputPeer](/type/InputPeer.md) | The private chat where the wallpaper will be set |
| **wallpaper** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputWallPaper](/type/InputWallPaper.md) | The [wallpaper »](/api/wallpapers.md), obtained as described in the [wallpaper documentation »](/api/wallpapers.md#uploading-wallpapers); must **not** be provided when installing a wallpaper obtained from a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) service message (`id` must be provided, instead). |
| **settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[WallPaperSettings](/type/WallPaperSettings.md) | Wallpaper settings, obtained as described in the [wallpaper documentation »](/api/wallpapers.md#uploading-wallpapers) or from [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md).`wallpaper`.`settings`. |
| **id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If the wallpaper was obtained from a [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md) service message, must contain the ID of that message. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | WALLPAPER\_INVALID | The specified wallpaper is invalid. |
| 400 | WALLPAPER\_NOT\_FOUND | The specified wallpaper could not be found. |

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Chat wallpapers](/api/wallpapers.md)
Telegram apps support generating, sharing and synchronizing chat backgrounds.

#### [messageActionSetChatWallPaper](/constructor/messageActionSetChatWallPaper.md)
The [wallpaper »](/api/wallpapers.md) of the current chat was changed.