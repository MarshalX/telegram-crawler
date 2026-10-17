# connectedBotStarRef

Info about an [active affiliate program we have with a Mini App](/api/bots/referrals.md#becoming-an-affiliate)

```tl
connectedBotStarRef#19a13f71 flags:# revoked:flags.1?true url:string date:int bot_id:long commission_permille:int duration_months:flags.0?int participants:long revenue:long = ConnectedBotStarRef;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoked** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, this affiliation was revoked by the affiliate using [payments.editConnectedStarRefBot](/method/payments.editConnectedStarRefBot.md), or by the affiliation program owner using [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md) |
| **url** | [string](/type/string.md) | [Referral link](/api/links.md#referral-links) to be shared |
| **date** | [int](/type/int.md) | When did we affiliate with `bot_id` |
| **bot\_id** | [long](/type/long.md) | ID of the mini app that created the affiliate program |
| **commission\_permille** | [int](/type/int.md) | The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by `bot_id` |
| **duration\_months** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | Number of months the program will be active; if not set, there is no expiration date. |
| **participants** | [long](/type/long.md) | The number of users that used the affiliate program |
| **revenue** | [long](/type/long.md) | The number of Telegram Stars that were earned by the affiliate program |

### Type
[ConnectedBotStarRef](/type/ConnectedBotStarRef.md)

### Related pages

#### [payments.editConnectedStarRefBot](/method/payments.editConnectedStarRefBot.md)
Leave a bot's [affiliate program »](/api/bots/referrals.md#becoming-an-affiliate)

#### [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md)
Create, edit or delete the [affiliate program](/api/bots/referrals.md) of a bot we own

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.