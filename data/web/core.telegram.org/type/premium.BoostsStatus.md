# Premium.BoostsStatus

Contains info about the current [boost status](/api/boost.md) of a peer.

```tl
premium.boostsStatus#4959427a flags:# my_boost:flags.2?true level:int current_level_boosts:int boosts:int gift_boosts:flags.4?int next_level_boosts:flags.0?int premium_audience:flags.1?StatsPercentValue boost_url:string prepaid_giveaways:flags.3?Vector<PrepaidGiveaway> my_boost_slots:flags.2?Vector<int> = premium.BoostsStatus;

---functions---

premium.getBoostsStatus#42f1f61 peer:InputPeer = premium.BoostsStatus;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [premium.boostsStatus](/constructor/premium.boostsStatus.md) | Contains info about the current [boost status](/api/boost.md) of a peer. |

### Methods

| Method | Description |
| --- | --- |
| [premium.getBoostsStatus](/method/premium.getBoostsStatus.md) | Gets the current [number of boosts](/api/boost.md) of a channel/supergroup. |

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.