# payments.toggleChatStarGiftNotifications

Enables or disables the reception of notifications every time a [gift »](/api/gifts.md) is received by the specified channel, can only be invoked by admins with `post_messages` [admin rights](/constructor/chatAdminRights.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.toggleChatStarGiftNotifications#60eaefa1 flags:# enabled:flags.0?true peer:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to enable or disable reception of notifications in the form of [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md) and [messageActionStarGift](/constructor/messageActionStarGift.md) service messages from the channel. |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel for which to receive or not receive notifications. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [messageActionStarGiftUnique](/constructor/messageActionStarGiftUnique.md)
A [gift »](/api/gifts.md) was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [messageActionStarGift](/constructor/messageActionStarGift.md)
You received a [gift, see here »](/api/gifts.md) for more info.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [chatAdminRights](/constructor/chatAdminRights.md)
Represents the rights of an admin in a [channel/supergroup](/api/channel.md).