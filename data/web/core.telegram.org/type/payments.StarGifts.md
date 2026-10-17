# payments.StarGifts

Available [gifts »](/api/gifts.md).

```tl
payments.starGiftsNotModified#a388a368 = payments.StarGifts;
payments.starGifts#2ed82995 hash:int gifts:Vector<StarGift> chats:Vector<Chat> users:Vector<User> = payments.StarGifts;

---functions---

payments.getStarGifts#c4563590 hash:int = payments.StarGifts;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftsNotModified](/constructor/payments.starGiftsNotModified.md) | The list of available [gifts »](/api/gifts.md) hasn't changed. |
| [payments.starGifts](/constructor/payments.starGifts.md) | Available [gifts »](/api/gifts.md). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGifts](/method/payments.getStarGifts.md) | Get a list of available [gifts, see here »](/api/gifts.md) for more info. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.