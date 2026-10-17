# premium.myBoosts

A list of peers we are currently [boosting](/api/boost.md), and how many [boost slots](/api/boost.md) we have left.

```tl
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **my\_boosts** | [Vector](/type/Vector%20t)&lt;[MyBoost](/type/MyBoost.md)&gt; | Info about boosted peers and remaining boost slots. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Referenced chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Referenced users |

### Type
[premium.MyBoosts](/type/premium.MyBoosts.md)

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.