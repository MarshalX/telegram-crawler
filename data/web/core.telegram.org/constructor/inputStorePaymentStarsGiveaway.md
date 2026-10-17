# inputStorePaymentStarsGiveaway

Used to pay for a [star giveaway, see here »](/api/giveaways.md#star-giveaways) for more info.

```tl
inputStorePaymentStarsGiveaway#751f08fa flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.3?true stars:long boost_peer:InputPeer additional_peers:flags.1?Vector<InputPeer> countries_iso2:flags.2?Vector<string> prize_description:flags.4?string random_id:long until_date:int currency:string amount:long users:int = InputStorePaymentPurpose;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **only\_new\_subscribers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, only new subscribers starting from the giveaway creation date will be able to participate to the giveaway. |
| **winners\_are\_visible** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, giveaway winners are public and will be listed in a [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md) message that will be automatically sent to the channel once the giveaway ends. |
| **stars** | [long](/type/long.md) | Total number of Telegram Stars being given away (each user will receive `stars/users` stars). |
| **boost\_peer** | [InputPeer](/type/InputPeer.md) | The channel/supergroup starting the giveaway, that the user must join to participate, that will receive the giveaway [boosts](/api/boost.md); see [here »](/api/giveaways.md) for more info on giveaways. |
| **additional\_peers** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | Additional channels that the user must join to participate to the giveaway can be specified here. |
| **countries\_iso2** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The set of users that can participate to the giveaway can be restricted by passing here an explicit whitelist of up to [giveaway\_countries\_max](/api/config.md#giveaway-countries-max) countries, specified as two-letter ISO 3166-1 alpha-2 country codes. |
| **prize\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Can contain a textual description of additional giveaway prizes. |
| **random\_id** | [long](/type/long.md) | Random ID to avoid resending the giveaway. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **until\_date** | [int](/type/int.md) | The end date of the giveaway, must be at most [giveaway\_period\_max](/api/config.md#giveaway-period-max) seconds in the future; see [here »](/api/giveaways.md) for more info on giveaways. |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Total price in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **users** | [int](/type/int.md) | Number of winners. |

### Type
[InputStorePaymentPurpose](/type/InputStorePaymentPurpose.md)

### Related pages

#### [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md)
A [giveaway](/api/giveaways.md) with public winners has finished, this constructor contains info about the winners.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Bot Payments API](/bots/payments.md)