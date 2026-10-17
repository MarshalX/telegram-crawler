# premium.applyBoost

Apply one or more [boosts »](/api/boost.md) to a peer.

```tl
premium.myBoosts#9ae228e2 my_boosts:Vector<MyBoost> chats:Vector<Chat> users:Vector<User> = premium.MyBoosts;
---functions---
premium.applyBoost#6b7da746 flags:# slots:flags.0?Vector<int> peer:InputPeer = premium.MyBoosts;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **slots** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Which [boost slots](/api/boost.md) to assign to this peer. |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer to boost. |

### Result
[premium.MyBoosts](/type/premium.MyBoosts.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOOSTS\_EMPTY | No boost slots were specified. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SLOTS\_EMPTY | The specified slot list is empty. |

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.