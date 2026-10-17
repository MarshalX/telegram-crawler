# starsGiveawayOption

Contains info about a [Telegram Star giveaway](/api/giveaways.md#star-giveaways) option.

```tl
starsGiveawayOption#94ce852a flags:# extended:flags.0?true default:flags.1?true stars:long yearly_boosts:int store_product:flags.2?string currency:string amount:long winners:Vector<StarsGiveawayWinnersOption> = StarsGiveawayOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **extended** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this option must only be shown in the full list of giveaway options (i.e. they must be added to the list only when the user clicks on the expand button). |
| **default** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, this option must be pre-selected by default in the option list. |
| **stars** | [long](/type/long.md) | The number of Telegram Stars that will be distributed among winners |
| **yearly\_boosts** | [int](/type/int.md) | Number of times the chat will be boosted for one year if the [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md).`boost_peer` flag is populated |
| **store\_product** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Identifier of the store product associated with the option, official apps only. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **winners** | [Vector](/type/Vector%20t)&lt;[StarsGiveawayWinnersOption](/type/StarsGiveawayWinnersOption.md)&gt; | Allowed options for the number of giveaway winners. |

### Type
[StarsGiveawayOption](/type/StarsGiveawayOption.md)

### Related pages

#### [inputStorePaymentStarsGiveaway](/constructor/inputStorePaymentStarsGiveaway.md)
Used to pay for a [star giveaway, see here »](/api/giveaways.md#star-giveaways) for more info.

#### [Bot Payments API](/bots/payments.md)

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.