# starsRevenueStatus

Describes [Telegram Star revenue balances »](/api/stars.md).

```tl
starsRevenueStatus#febe5491 flags:# withdrawal_enabled:flags.0?true current_balance:StarsAmount available_balance:StarsAmount overall_revenue:StarsAmount next_withdrawal_at:flags.1?int = StarsRevenueStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **withdrawal\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the user may [withdraw](/api/stars.md#withdrawing-revenue) up to `available_balance` stars. |
| **current\_balance** | [StarsAmount](/type/StarsAmount.md) | Amount of not-yet-withdrawn Telegram Stars. |
| **available\_balance** | [StarsAmount](/type/StarsAmount.md) | Amount of withdrawable Telegram Stars. |
| **overall\_revenue** | [StarsAmount](/type/StarsAmount.md) | Total amount of earned Telegram Stars. |
| **next\_withdrawal\_at** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Unixtime indicating when will withdrawal be available to the user. If not set, withdrawal can be started now. |

### Type
[StarsRevenueStatus](/type/StarsRevenueStatus.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.