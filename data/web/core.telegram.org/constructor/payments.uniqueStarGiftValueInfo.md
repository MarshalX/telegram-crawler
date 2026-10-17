# payments.uniqueStarGiftValueInfo

Information about the value of a [collectible gift »](/api/gifts.md#collectible-gifts).

```tl
payments.uniqueStarGiftValueInfo#512fe446 flags:# last_sale_on_fragment:flags.1?true value_is_average:flags.6?true currency:string value:long initial_sale_date:int initial_sale_stars:long initial_sale_price:long last_sale_date:flags.0?int last_sale_price:flags.0?long floor_price:flags.2?long average_price:flags.3?long listed_count:flags.4?int fragment_listed_count:flags.5?int fragment_listed_url:flags.5?string = payments.UniqueStarGiftValueInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **last\_sale\_on\_fragment** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the last sale was completed on Fragment. |
| **value\_is\_average** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[true](/constructor/true.md) | If set, the `value` is calculated from the average value of sold gifts of the same type. Otherwise, it is based on the sale price of the gift. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code (a localized fiat currency used to represent prices and price estimations in this constructor). |
| **value** | [long](/type/long.md) | Estimated value of the gift, in the smallest unit of the currency specified in `currency`. |
| **initial\_sale\_date** | [int](/type/int.md) | Initial purchase date of the gift. |
| **initial\_sale\_stars** | [long](/type/long.md) | Initial purchase price in Stars. |
| **initial\_sale\_price** | [long](/type/long.md) | Initial purchase price in the smallest unit of the currency specified in `currency` (automatically converted from `initial_sale_stars`). |
| **last\_sale\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Last resale date of the gift. |
| **last\_sale\_price** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Last resale price, in the smallest unit of the currency specified in `currency`. |
| **floor\_price** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[long](/type/long.md) | The current minimum price of collectible gifts of the same type, in the smallest unit of the currency specified in `currency`. |
| **average\_price** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | The current average sale price of collectible gifts of the same type, in the smallest unit of the currency specified in `currency`. |
| **listed\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Number of gifts of the same type currently being resold on Telegram. |
| **fragment\_listed\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | Number of gifts of the same type currently being resold on fragment. |
| **fragment\_listed\_url** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[string](/type/string.md) | Fragment link to the listing of gifts of the same type currently being resold on fragment. |

### Type
[payments.UniqueStarGiftValueInfo](/type/payments.UniqueStarGiftValueInfo.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.