# payments.starGiftUpgradePreview

A preview of the possible attributes (chosen randomly) a [gift »](/api/gifts.md) can receive after upgrading it to a [collectible gift »](/api/gifts.md#collectible-gifts), see [here »](/api/gifts.md#collectible-gifts) for more info.

```tl
payments.starGiftUpgradePreview#3de1dfed sample_attributes:Vector<StarGiftAttribute> prices:Vector<StarGiftUpgradePrice> next_prices:Vector<StarGiftUpgradePrice> = payments.StarGiftUpgradePreview;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **sample\_attributes** | [Vector](/type/Vector%20t)&lt;[StarGiftAttribute](/type/StarGiftAttribute.md)&gt; | Possible gift attributes |
| **prices** | [Vector](/type/Vector%20t)&lt;[StarGiftUpgradePrice](/type/StarGiftUpgradePrice.md)&gt; | Contains a similar list of upgrade prices and timestamps, not as granular as in `next_prices` (i.e. prices are approximately 1 month apart), to be used mainly to scale the price graph, and to show a more general future overview of the upgrade price. |
| **next\_prices** | [Vector](/type/Vector%20t)&lt;[StarGiftUpgradePrice](/type/StarGiftUpgradePrice.md)&gt; | Contains the current upgrade price and a list of future prices, each associated to a UNIX timestamp that indicates when the price comes in effect (the current price is valid only until the next one comes into effect, and so on for all prices in the list). |

### Type
[payments.StarGiftUpgradePreview](/type/payments.StarGiftUpgradePreview.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.