# payments.SavedStarGifts

Represents a list of [gifts](/api/gifts.md).

```tl
payments.savedStarGifts#95f389b1 flags:# count:int chat_notifications_enabled:flags.1?Bool gifts:Vector<SavedStarGift> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.SavedStarGifts;

---functions---

payments.getSavedStarGifts#a319e569 flags:# exclude_unsaved:flags.0?true exclude_saved:flags.1?true exclude_unlimited:flags.2?true exclude_unique:flags.4?true sort_by_value:flags.5?true exclude_upgradable:flags.7?true exclude_unupgradable:flags.8?true peer_color_available:flags.9?true exclude_hosted:flags.10?true peer:InputPeer collection_id:flags.6?int offset:string limit:int = payments.SavedStarGifts;
payments.getSavedStarGift#b455a106 stargift:Vector<InputSavedStarGift> = payments.SavedStarGifts;
payments.getCraftStarGifts#fd05dd00 gift_id:long offset:string limit:int = payments.SavedStarGifts;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.savedStarGifts](/constructor/payments.savedStarGifts.md) | Represents a list of [gifts](/api/gifts.md). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getSavedStarGifts](/method/payments.getSavedStarGifts.md) | Fetch the full list of [gifts »](/api/gifts.md#list-all-received-gifts) owned, received or [hosted »](/api/gifts.md#hosted-collectible-gifts) by a peer.\
\
Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned) to the profile, depending on the passed flags. |
| [payments.getSavedStarGift](/method/payments.getSavedStarGift.md) | Fetch info about specific [gifts](/api/gifts.md) owned by a peer we control.\
\
Note that unlike what the name suggests, the method can be used to fetch both "saved" and "unsaved" gifts (aka gifts both pinned and not pinned to the profile). |
| [payments.getCraftStarGifts](/method/payments.getCraftStarGifts.md) | Obtain owned [collectible gifts »](/api/gifts.md#collectible-gifts) of a specific type that can be used for [crafting »](/api/gifts.md#crafting-collectible-gifts). |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.