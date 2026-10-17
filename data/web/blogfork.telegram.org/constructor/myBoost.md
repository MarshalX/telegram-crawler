# myBoost

Contains information about a single [boost slot »](/api/boost.md).

```tl
myBoost#c448415c flags:# slot:int peer:flags.0?Peer date:int expires:int cooldown_until_date:flags.1?int = MyBoost;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **slot** | [int](/type/int.md) | [Boost slot ID »](/api/boost.md) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Peer](/type/Peer.md) | If set, indicates this slot is currently occupied, i.e. we are [boosting](/api/boost.md) this peer.  \
Note that we can assign multiple boost slots to the same peer. |
| **date** | [int](/type/int.md) | When (unixtime) we started boosting the `peer`, `0` otherwise. |
| **expires** | [int](/type/int.md) | Indicates the (unixtime) expiration date of the boost in `peer` (`0` if `peer` is not set). |
| **cooldown\_until\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If `peer` is set, indicates the (unixtime) date after which this boost can be reassigned to another channel. |

### Type
[MyBoost](/type/MyBoost.md)

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.