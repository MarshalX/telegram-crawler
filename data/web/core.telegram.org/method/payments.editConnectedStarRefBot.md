# payments.editConnectedStarRefBot

Leave a bot's [affiliate program »](/api/bots/referrals.md#becoming-an-affiliate)

```tl
payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;
---functions---
payments.editConnectedStarRefBot#e4fca4a3 flags:# revoked:flags.0?true peer:InputPeer link:string = payments.ConnectedStarRefBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **revoked** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, leaves the bot's affiliate program |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that was affiliated |
| **link** | [string](/type/string.md) | The affiliate link to revoke |

### Result
[payments.ConnectedStarRefBots](/type/payments.ConnectedStarRefBots.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STARREF\_HASH\_REVOKED | The specified affiliate link was already revoked. |

### Related pages

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.