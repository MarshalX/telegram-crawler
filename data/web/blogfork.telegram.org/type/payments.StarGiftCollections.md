# payments.StarGiftCollections

Represents a list of [star gift collections »](/api/gifts.md#gift-collections).

```tl
payments.starGiftCollectionsNotModified#a0ba4f17 = payments.StarGiftCollections;
payments.starGiftCollections#8a2932f3 collections:Vector<StarGiftCollection> = payments.StarGiftCollections;

---functions---

payments.getStarGiftCollections#981b91dd peer:InputPeer hash:long = payments.StarGiftCollections;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftCollectionsNotModified](/constructor/payments.starGiftCollectionsNotModified.md) | The list of [star gift collections »](/api/gifts.md#gift-collections) hasn't changed. |
| [payments.starGiftCollections](/constructor/payments.starGiftCollections.md) | Represents a list of [star gift collections »](/api/gifts.md#gift-collections). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGiftCollections](/method/payments.getStarGiftCollections.md) | Fetches all [star gift collections »](/api/gifts.md#gift-collections) of a peer. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.