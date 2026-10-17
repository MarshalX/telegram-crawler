# Payments.StarGiftUpgradeAttributes

List of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
payments.starGiftUpgradeAttributes#46c6e36f attributes:Vector<StarGiftAttribute> = payments.StarGiftUpgradeAttributes;

---functions---

payments.getStarGiftUpgradeAttributes#6d038b58 gift_id:long = payments.StarGiftUpgradeAttributes;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.starGiftUpgradeAttributes](/constructor/payments.starGiftUpgradeAttributes.md) | List of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts). |

### Methods

| Method | Description |
| --- | --- |
| [payments.getStarGiftUpgradeAttributes](/method/payments.getStarGiftUpgradeAttributes.md) | Obtains the **full** list of just the collectible attributes that may appear for a gift type once it's upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).\
\
The result may also include [starGiftAttributeModel](/constructor/starGiftAttributeModel.md) constructors with the `crafted` flag set: these models are reserved for [crafting »](/api/gifts.md#crafting-collectible-gifts) and should be filtered out from regular upgrade previews (and vice versa). |

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.