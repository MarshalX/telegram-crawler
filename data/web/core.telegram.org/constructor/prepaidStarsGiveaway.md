# prepaidStarsGiveaway

Contains info about a [prepaid Telegram Star giveaway »](/api/giveaways.md#star-giveaways).

```tl
prepaidStarsGiveaway#9a9d77e0 id:long stars:long quantity:int boosts:int date:int = PrepaidGiveaway;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Prepaid giveaway ID. |
| **stars** | [long](/type/long.md) | Number of given away [Telegram Stars »](/api/stars.md) |
| **quantity** | [int](/type/int.md) | Number of giveaway winners |
| **boosts** | [int](/type/int.md) | Number of boosts the channel will gain by launching the giveaway. |
| **date** | [int](/type/int.md) | When was the giveaway paid for |

### Type
[PrepaidGiveaway](/type/PrepaidGiveaway.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.