# messageMediaGiveawayResults

A [giveaway](/api/giveaways.md) with public winners has finished, this constructor contains info about the winners.

```tl
messageMediaGiveawayResults#ceaa3ea1 flags:# only_new_subscribers:flags.0?true refunded:flags.2?true channel_id:long additional_peers_count:flags.3?int launch_msg_id:int winners_count:int unclaimed_count:int winners:Vector<long> months:flags.4?int stars:flags.5?long prize_description:flags.1?string until_date:int = MessageMedia;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **only\_new\_subscribers** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, only new subscribers starting from the giveaway creation date participated in the giveaway. |
| **refunded** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the giveaway was canceled and was fully refunded. |
| **channel\_id** | [long](/type/long.md) | ID of the channel/supergroup that was automatically [boosted](/api/boost.md) by the winners of the giveaway for duration of the Premium subscription. |
| **additional\_peers\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[int](/type/int.md) | Number of other channels that participated in the giveaway. |
| **launch\_msg\_id** | [int](/type/int.md) | Identifier of the message with the giveaway in `channel_id`. |
| **winners\_count** | [int](/type/int.md) | Total number of winners in the giveaway. |
| **unclaimed\_count** | [int](/type/int.md) | Number of not-yet-claimed prizes. |
| **winners** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Up to 100 user identifiers of the winners of the giveaway. |
| **months** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | Duration in months of each [Telegram Premium](/api/premium.md) subscription in the giveaway. |
| **stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[long](/type/long.md) | For [Telegram Star giveaways](/api/stars.md#star-giveaways), the total number of Telegram Stars being given away. |
| **prize\_description** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Can contain a textual description of additional giveaway prizes. |
| **until\_date** | [int](/type/int.md) | Point in time (Unix timestamp) when the winners were selected. May be bigger than winners selection date specified in initial parameters of the giveaway. |

### Type
[MessageMedia](/type/MessageMedia.md)

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.