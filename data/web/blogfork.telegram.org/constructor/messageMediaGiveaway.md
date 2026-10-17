# messageMediaGiveaway

Contains info about a [giveaway, see here »](/api/giveaways.md) for more info.

```tl
messageMediaGiveaway#aa073beb flags:# only_new_subscribers:flags.0?true winners_are_visible:flags.2?true channels:Vector<long> countries_iso2:flags.1?Vector<string> prize_description:flags.3?string quantity:int months:flags.4?int stars:flags.5?long until_date:int = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **only\_new\_subscribers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, only new subscribers starting from the giveaway creation date will be able to participate to the giveaway. |
| **winners\_are\_visible** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, giveaway winners are public and will be listed in a [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md) message that will be automatically sent to the channel once the giveaway ends. |
| **channels** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | The channels that the user must join to participate in the giveaway. |
| **countries\_iso2** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | If set, only users residing in these countries can participate in the giveaway, (specified as a list of two-letter ISO 3166-1 alpha-2 country codes); otherwise there are no country-based limitations. |
| **prize\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Can contain a textual description of additional giveaway prizes. |
| **quantity** | [int](/type/int.md) | Number of [Telegram Premium](/api/premium.md) subscriptions given away. |
| **months** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Duration in months of each [Telegram Premium](/api/premium.md) subscription in the giveaway. |
| **stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[long](/type/long.md) | For [Telegram Star giveaways](/api/stars.md#star-giveaways), the total number of Telegram Stars being given away. |
| **until\_date** | [int](/type/int.md) | The end date of the giveaway. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [messageMediaGiveawayResults](/constructor/messageMediaGiveawayResults.md)
A [giveaway](/api/giveaways.md) with public winners has finished, this constructor contains info about the winners.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.