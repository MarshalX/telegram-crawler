# payments.connectStarRefBot

Join a bot's [affiliate program, becoming an affiliate »](/api/bots/referrals.md#becoming-an-affiliate)

```tl
payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;
---functions---
payments.connectStarRefBot#7ed5348a peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer that will become the affiliate: star commissions will be transferred to this peer's star balance. |
| **bot** | [InputUser](/type/InputUser.md) | The bot that offers the affiliate program |

### Result
[payments.ConnectedStarRefBots](/type/payments.ConnectedStarRefBots.md)

### Only users can use this method

### Related pages

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.