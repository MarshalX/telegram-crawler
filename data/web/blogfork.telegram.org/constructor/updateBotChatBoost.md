# updateBotChatBoost

A [channel/supergroup boost](/api/boost.md) has changed (bots only)

```tl
updateBotChatBoost#904dd49c peer:Peer boost:Boost qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Channel |
| **boost** | [Boost](/type/Boost.md) | New boost information |
| **qts** | [int](/type/int.md) | [QTS](/api/updates.md) event sequence identifier |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.