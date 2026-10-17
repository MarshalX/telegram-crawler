# prepaidGiveaway

Contains info about a [prepaid giveaway »](/api/giveaways.md).

```tl
prepaidGiveaway#b2539d54 id:long months:int quantity:int date:int = PrepaidGiveaway;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [long](/type/long.md) | Prepaid giveaway ID. |
| **months** | [int](/type/int.md) | Duration in months of each gifted [Telegram Premium](/api/premium.md) subscription. |
| **quantity** | [int](/type/int.md) | Number of given away [Telegram Premium](/api/premium.md) subscriptions. |
| **date** | [int](/type/int.md) | Payment date. |

### Type
[PrepaidGiveaway](/type/PrepaidGiveaway.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.