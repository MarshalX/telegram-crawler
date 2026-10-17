# premium.getMyBoosts

Obtain which peers are we currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left.

```tl
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
---functions---
premium.getMyBoosts#be77b4a = premium.MyBoosts;
```

### Parameters

This constructor does not require any parameters.

### Result
[premium.MyBoosts](/type/premium.MyBoosts.md)

### Only users can use this method

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.