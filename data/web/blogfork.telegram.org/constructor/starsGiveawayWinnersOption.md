# starsGiveawayWinnersOption

Allowed options for the number of giveaway winners.

```tl
starsGiveawayWinnersOption#54236209 flags:# default:flags.0?true users:int per_user_stars:long = StarsGiveawayWinnersOption;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **default** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this option must be pre-selected by default in the option list. |
| **users** | [int](/type/int.md) | The number of users that will be randomly chosen as winners. |
| **per\_user\_stars** | [long](/type/long.md) | The number of [Telegram Stars](/api/stars.md) each winner will receive. |

### Type
[StarsGiveawayWinnersOption](/type/StarsGiveawayWinnersOption.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.