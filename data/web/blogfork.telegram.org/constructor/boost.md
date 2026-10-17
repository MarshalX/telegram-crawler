# boost

Info about one or more [boosts](/api/boost.md) applied by a specific user.

```tl
boost#4b3e14d6 flags:# gift:flags.1?true giveaway:flags.2?true unclaimed:flags.3?true id:string user_id:flags.0?long giveaway_msg_id:flags.2?int date:int expires:int used_gift_slug:flags.4?string multiplier:flags.5?int stars:flags.6?long = Boost;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **gift** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this boost was applied because the channel/supergroup [directly gifted a subscription to the user](/api/giveaways.md). |
| **giveaway** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this boost was applied because the user was chosen in a [giveaway started by the channel/supergroup](/api/giveaways.md). |
| **unclaimed** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, the user hasn't yet invoked [payments.applyGiftCode](/method/payments.applyGiftCode.md) to claim a subscription gifted [directly or in a giveaway by the channel](/api/giveaways.md). |
| **id** | [string](/type/string.md) | Unique ID for this set of boosts. |
| **user\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the user that applied the boost. |
| **giveaway\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | The message ID of the [giveaway](/api/giveaways.md) |
| **date** | [int](/type/int.md) | When was the boost applied |
| **expires** | [int](/type/int.md) | When does the boost expire |
| **used\_gift\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | The created Telegram Premium gift code, only set if either `gift` or `giveaway` are set AND it is either a gift code for the currently logged in user or if it was already claimed. |
| **multiplier** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[int](/type/int.md) | If set, this boost counts as `multiplier` boosts, otherwise it counts as a single boost. |
| **stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[long](/type/long.md) | Number of Telegram Stars distributed among the winners of the giveaway. |

### Type
[Boost](/type/Boost.md)

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [payments.applyGiftCode](/method/payments.applyGiftCode.md)
Apply a [Telegram Premium giftcode »](/api/giveaways.md)

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.