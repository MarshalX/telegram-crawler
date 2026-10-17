# payments.StarGiftUpgradePreview

A preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info.

```tl
payments.starGiftUpgradePreview#3de1dfed sample_attributes:Vector<StarGiftAttribute> prices:Vector<StarGiftUpgradePrice> next_prices:Vector<StarGiftUpgradePrice> = payments.StarGiftUpgradePreview;

---functions---

payments.getStarGiftUpgradePreview#9c9abcb1 gift_id:long = payments.StarGiftUpgradePreview;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftUpgradePreview](/constructor/payments.starGiftUpgradePreview.md) | A preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGiftUpgradePreview](/method/payments.getStarGiftUpgradePreview.md) | Obtain a preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info. |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.