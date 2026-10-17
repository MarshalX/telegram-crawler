# messageActionGiveawayLaunch

A [giveaway](/api/giveaways.md) was started.

```tl
messageActionGiveawayLaunch#a80f51e4 flags:# stars:flags.0?long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stars** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | For [Telegram Star giveaways](/api/stars.md#star-giveaways), the total number of Telegram Stars being given away. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.