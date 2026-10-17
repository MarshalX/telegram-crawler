# Premium.MyBoosts

A list of peers we are currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left.

```tl
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;

---functions---

premium.getMyBoosts#be77b4a = premium.MyBoosts;
premium.applyBoost#6b7da746 flags:# slots:flags.0?Vector<int> peer:InputPeer = premium.MyBoosts;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [premium.myBoosts](/constructor/premium.myBoosts.md) | A list of peers we are currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left. |

### Methods

| Method | Description |
| --- | --- |
| [premium.getMyBoosts](/method/premium.getMyBoosts.md) | Obtain which peers are we currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left. |
| [premium.applyBoost](/method/premium.applyBoost.md) | Apply one or more [boosts »](/api/boost.md) to a peer. |

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.