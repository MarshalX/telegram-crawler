# payments.savedStarGifts

Represents a list of [gifts](/api/gifts.md).

```tl
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results (can be less than the returned `gifts`, in which case `next_offset` will be set). |
| **chat\_notifications\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Bool](/type/Bool.md) | Ternary value: can be not set, set&amp;true, set&amp;false. \
Can only be set for channels we own: the value indicates whether we [enabled gift notifications](/api/gifts.md#notifications-for-received-channel-gifts) for this channel. |
| **gifts** | [Vector](/type/Vector%20t)&lt;[SavedStarGift](/type/SavedStarGift.md)&gt; | Gifts |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset to pass to [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) to fetch the next page of results. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Channels mentioned in `gifts` |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in `gifts` |

### Type
[payments.SavedStarGifts](/type/payments.SavedStarGifts.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.

#### [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md)
Fetch the full list of [gifts »](/api/gifts.md#list-all-received-gifts) owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by a peer.

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned) to the profile, depending on the passed flags.