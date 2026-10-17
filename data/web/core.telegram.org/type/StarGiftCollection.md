# StarGiftCollection

Represents a [star gift collection »](/api/gifts.md#gift-collections).

```tl
starGiftCollection#9d6b13b0 flags:# collection_id:int title:string icon:flags.0?Document gifts_count:int hash:long = StarGiftCollection;

---functions---

payments.createStarGiftCollection#1f4a0e87 peer:InputPeer title:string stargift:Vector<InputSavedStarGift> = StarGiftCollection;
payments.updateStarGiftCollection#4fddbee7 flags:# peer:InputPeer collection_id:int title:flags.0?string delete_stargift:flags.1?Vector<InputSavedStarGift> add_stargift:flags.2?Vector<InputSavedStarGift> order:flags.3?Vector<InputSavedStarGift> = StarGiftCollection;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [starGiftCollection](/constructor/starGiftCollection.md) | Represents a [star gift collection »](/api/gifts.md#gift-collections). |

### Methods

| Method | Description |
| --- | --- |
| [payments.createStarGiftCollection](/method/payments.createStarGiftCollection.md) | Create a [star gift collection »](/api/gifts.md#gift-collections). |
| [payments.updateStarGiftCollection](/method/payments.updateStarGiftCollection.md) | Add or remove gifts from a [star gift collection »](/api/gifts.md#gift-collections), or rename the collection. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.