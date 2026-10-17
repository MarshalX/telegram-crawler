# starRefProgram

Info about an [affiliate program offered by a bot](/api/bots/referrals.md)

```tl
starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot\_id** | [long](/type/long.md) | ID of the bot that offers the program |
| **commission\_permille** | [int](/type/int.md) | An affiliate gets a commission of [starRefProgram](/constructor/starRefProgram.md).`commission_permille`‰ [Telegram Stars](/api/stars.md) for every mini app transaction made by users they refer |
| **duration\_months** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | An affiliate gets a commission for every mini app transaction made by users they refer, for `duration_months` months after a referral link is imported, starting the bot for the first time |
| **end\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Point in time (Unix timestamp) when the affiliate program will be closed (optional, if not set the affiliate program isn't scheduled to be closed) |
| **daily\_revenue\_per\_user** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[StarsAmount](/type/StarsAmount.md) | The amount of daily revenue per user in Telegram Stars of the bot that created the affiliate program. \
To obtain the approximated revenue per referred user, multiply this value by `commission_permille` and divide by `1000`. |

### Type
[StarRefProgram](/type/StarRefProgram.md)

### Related pages

#### [starRefProgram](/constructor/starRefProgram.md)
Info about an [affiliate program offered by a bot](/api/bots/referrals.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.