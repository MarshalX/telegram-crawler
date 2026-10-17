# payments.getStarsRevenueStats

Get [Telegram Star revenue statistics »](/api/stars.md).

```tl
payments.starsRevenueStats#6c207376 flags:# top_hours_graph:flags.0?StatsGraph revenue_graph:StatsGraph status:StarsRevenueStatus usd_rate:double = payments.StarsRevenueStats;
---functions---
payments.getStarsRevenueStats#d91ffad6 flags:# dark:flags.0?true ton:flags.1?true peer:InputPeer = payments.StarsRevenueStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to enable dark theme for graph colors |
| **ton** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, fetches channel/bot ad revenue statistics in TON. |
| **peer** | [InputPeer](/type/InputPeer.md) | Get statistics for the specified bot, channel or ourselves ([inputPeerSelf](/constructor/inputPeerSelf.md)). |

### Result
[payments.StarsRevenueStats](/type/payments.StarsRevenueStats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.