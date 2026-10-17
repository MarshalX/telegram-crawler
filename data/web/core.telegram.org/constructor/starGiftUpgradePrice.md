# starGiftUpgradePrice

Indicates the price for a [gift upgrade »](/api/gifts.md#collectible-gifts) starting from a specific point in time.

```tl
starGiftUpgradePrice#99ea331d date:int upgrade_stars:long = StarGiftUpgradePrice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **date** | [int](/type/int.md) | UNIX timestamp indicating when the price will be in effect. |
| **upgrade\_stars** | [long](/type/long.md) | Upgrade price. |

### Type
[StarGiftUpgradePrice](/type/StarGiftUpgradePrice.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.