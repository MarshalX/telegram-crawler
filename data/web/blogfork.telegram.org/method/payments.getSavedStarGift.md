# payments.getSavedStarGift

Fetch info about specific [gifts](/api/gifts.md) owned by a peer we control.

Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned to the profile).

```tl
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;
---functions---
payments.getSavedStarGift#b455a106 stargift:Vector<InputSavedStarGift> = payments.SavedStarGifts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [Vector](/type/Vector%20t)&lt;[InputSavedStarGift](/type/InputSavedStarGift.md)&gt; | List of gifts to fetch info about. |

### Result
[payments.SavedStarGifts](/type/payments.SavedStarGifts.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SAVED\_ID\_EMPTY | The passed inputSavedStarGiftChat.saved_id is empty. |
| 400 | STARGIFT\_OWNER\_INVALID | You cannot transfer or sell a gift owned by another user. |
| 400 | STARGIFT\_SLUG\_INVALID | The specified gift slug is invalid. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.