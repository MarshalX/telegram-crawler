# bots.updateStarRefProgram

Create, edit or delete the [affiliate program](/api/bots/referrals.md) of a bot we own

```tl
starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;
---functions---
bots.updateStarRefProgram#778b5ab3 flags:# bot:InputUser commission_permille:int duration_months:flags.0?int = StarRefProgram;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot** | [InputUser](/type/InputUser.md) | The bot |
| **commission\_permille** | [int](/type/int.md) | The permille commission rate: it indicates the share of Telegram Stars received by affiliates for every transaction made by users they referred inside of the bot.  \
  The minimum and maximum values for this parameter are contained in the [starref\_min\_commission\_permille](/api/config.md#starref-min-commission-permille) and [starref\_max\_commission\_permille](/api/config.md#starref-max-commission-permille) client configuration parameters. \
  Can be `0` to terminate the affiliate program.\
  Both the duration and the commission may only be raised after creation of the program: to lower them, the program must first be terminated and a new one created. |
| **duration\_months** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Indicates the duration of the affiliate program; if not set, there is no expiration date. |

### Result
[StarRefProgram](/type/StarRefProgram.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | STARREF\_AWAITING\_END | The previous referral program was terminated less than 24 hours ago: further changes can be made after the date specified in userFull.starref_program.end_date. |
| 400 | STARREF\_PERMILLE\_INVALID | The specified commission_permille is invalid: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](/api/config.md#starref-min-commission-permille) and [starref_max_commission_permille](/api/config.md#starref-max-commission-permille) client configuration parameters. |
| 400 | STARREF\_PERMILLE\_TOO\_LOW | The specified commission_permille is too low: the minimum and maximum values for this parameter are contained in the [starref_min_commission_permille](/api/config.md#starref-min-commission-permille) and [starref_max_commission_permille](/api/config.md#starref-max-commission-permille) client configuration parameters. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.