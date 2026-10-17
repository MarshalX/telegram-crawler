# messageActionGiveawayResults

A [giveaway](/api/giveaways.md) has ended.

```tl
messageActionGiveawayResults#87e2f155 flags:# stars:flags.0?true winners_count:int unclaimed_count:int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, this is a [Telegram Star giveaway](/api/stars.md#star-giveaways) |
| **winners\_count** | [int](/type/int.md) | Number of winners in the giveaway |
| **unclaimed\_count** | [int](/type/int.md) | Number of undistributed prizes |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.