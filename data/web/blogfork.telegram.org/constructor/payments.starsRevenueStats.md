# payments.starsRevenueStats

[Star revenue statistics, see here »](/api/stars.md) for more info.

Note that all balances and currency amounts and graph values are in Stars.

```tl
payments.starsRevenueStats#6c207376 flags:# top_hours_graph:flags.0?StatsGraph revenue_graph:StatsGraph status:StarsRevenueStatus usd_rate:double = payments.StarsRevenueStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **top\_hours\_graph** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[StatsGraph](/type/StatsGraph.md) | For ad revenue statistics, ad impressions graph |
| **revenue\_graph** | [StatsGraph](/type/StatsGraph.md) | Star revenue graph (number of earned stars) |
| **status** | [StarsRevenueStatus](/type/StarsRevenueStatus.md) | Current balance, current withdrawable balance and overall earned Telegram Stars |
| **usd\_rate** | [double](/type/double.md) | Current conversion rate of Telegram Stars to USD |

### Type
[payments.StarsRevenueStats](/type/payments.StarsRevenueStats.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.