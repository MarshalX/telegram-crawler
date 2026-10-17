# Payments.ConnectedStarRefBots

Active [affiliations](/api/bots/referrals.md#becoming-an-affiliate)

```tl
payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;

---functions---

payments.getConnectedStarRefBots#5869a553 flags:# peer:InputPeer offset_date:flags.2?int offset_link:flags.2?string limit:int = payments.ConnectedStarRefBots;
payments.getConnectedStarRefBot#b7d998f0 peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;
payments.connectStarRefBot#7ed5348a peer:InputPeer bot:InputUser = payments.ConnectedStarRefBots;
payments.editConnectedStarRefBot#e4fca4a3 flags:# revoked:flags.0?true peer:InputPeer link:string = payments.ConnectedStarRefBots;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.connectedStarRefBots](/constructor/payments.connectedStarRefBots.md) | Active [affiliations](/api/bots/referrals.md#becoming-an-affiliate) |

### Methods

| Method | Description |
| --- | --- |
| [payments.getConnectedStarRefBots](/method/payments.getConnectedStarRefBots.md) | Fetch all affiliations we have created for a certain peer |
| [payments.getConnectedStarRefBot](/method/payments.getConnectedStarRefBot.md) | Fetch info about a specific [bot affiliation »](/api/bots/referrals.md) |
| [payments.connectStarRefBot](/method/payments.connectStarRefBot.md) | Join a bot's [affiliate program, becoming an affiliate »](/api/bots/referrals.md#becoming-an-affiliate) |
| [payments.editConnectedStarRefBot](/method/payments.editConnectedStarRefBot.md) | Leave a bot's [affiliate program »](/api/bots/referrals.md#becoming-an-affiliate) |

### Related pages

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.