# fragment.collectibleInfo

Info about a [fragment collectible](/api/fragment.md).

```tl
fragment.collectibleInfo#6ebdff91 purchase_date:int currency:string amount:long crypto_currency:string crypto_amount:long url:string = fragment.CollectibleInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **purchase\_date** | [int](/type/int.md) | Purchase date (unixtime) |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code for `amount` |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **crypto\_currency** | [string](/type/string.md) | Cryptocurrency name. |
| **crypto\_amount** | [long](/type/long.md) | Price, in the smallest units of the cryptocurrency. |
| **url** | [string](/type/string.md) | [Fragment](https://fragment.com) URL with more info about the collectible |

### Type
[fragment.CollectibleInfo](/type/fragment.CollectibleInfo.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Fragment collectibles](/api/fragment.md)
Telegram users can make it easy for others to contact them or find their public groups and channels via usernames: clients can also assign multiple Fragment &raquo; collectible usernames to accounts, supergroups and channels they own; Fragment &raquo; also allows purchasing phone number collectibles that can be used to register Telegram accounts.