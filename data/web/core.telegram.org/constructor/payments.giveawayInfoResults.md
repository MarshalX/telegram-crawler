# payments.giveawayInfoResults

A [giveaway](/api/giveaways.md) has ended.

```tl
payments.giveawayInfoResults#e175e66f flags:# winner:flags.0?true refunded:flags.1?true start_date:int gift_code_slug:flags.3?string stars_prize:flags.4?long finish_date:int winners_count:int activated_count:flags.2?int = payments.GiveawayInfo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **winner** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether we're one of the winners of this giveaway. |
| **refunded** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the giveaway was canceled and was fully refunded. |
| **start\_date** | [int](/type/int.md) | Start date of the giveaway |
| **gift\_code\_slug** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | If we're one of the winners of this giveaway, contains the [Premium gift code](/api/links.md#premium-giftcode-links), see [here »](/api/giveaways.md) for more info on the full giveaway flow. |
| **stars\_prize** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | If we're one of the winners of this [Telegram Star giveaway](/api/giveaways.md#star-giveaways), the number [Telegram Stars](/api/stars.md) we won. |
| **finish\_date** | [int](/type/int.md) | End date of the giveaway. May be bigger than the end date specified in parameters of the giveaway. |
| **winners\_count** | [int](/type/int.md) | Number of winners in the giveaway |
| **activated\_count** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | Number of winners, which activated their [gift codes](/api/links.md#premium-giftcode-links). |

### Type
[payments.GiveawayInfo](/type/payments.GiveawayInfo.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.