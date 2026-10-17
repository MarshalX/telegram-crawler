# premium.boostsStatus

Contains info about the current [boost status](/api/boost.md) of a peer.

```tl
premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **my\_boost** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether we're currently boosting this channel/supergroup, `my_boost_slots` will also be set. |
| **level** | [int](/type/int.md) | The current boost level of the channel/supergroup. |
| **current\_level\_boosts** | [int](/type/int.md) | The number of boosts acquired so far in the current level. |
| **boosts** | [int](/type/int.md) | Total number of boosts acquired so far. |
| **gift\_boosts** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[int](/type/int.md) | The number of boosts acquired from created Telegram Premium [gift codes](/api/giveaways.md) and [giveaways](/api/giveaways.md); only returned to channel/supergroup admins. |
| **next\_level\_boosts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Total number of boosts needed to reach the next level; if absent, the next level isn't available. |
| **premium\_audience** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[StatsPercentValue](/type/StatsPercentValue.md) | Only returned to channel/supergroup admins: contains the approximated number of Premium users subscribed to the channel/supergroup, related to the total number of subscribers. |
| **boost\_url** | [string](/type/string.md) | [Boost deep link »](/api/links.md#boost-links) that can be used to boost the chat. |
| **prepaid\_giveaways** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[PrepaidGiveaway](/type/PrepaidGiveaway.md)&gt; | A list of prepaid [giveaways](/api/giveaways.md) available for the chat; only returned to channel/supergroup admins. |
| **my\_boost\_slots** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Indicates which of our [boost slots](/api/boost.md) we've assigned to this peer (populated if `my_boost` is set). |

### Type
[premium.BoostsStatus](/type/premium.BoostsStatus.md)

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.