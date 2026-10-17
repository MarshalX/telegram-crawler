# StarRefProgram

Indo about an [affiliate program offered by a bot](/api/bots/referrals.md)

```tl
starRefProgram#dd0c66f2 flags:# bot_id:long commission_permille:int duration_months:flags.0?int end_date:flags.1?int daily_revenue_per_user:flags.2?StarsAmount = StarRefProgram;

---functions---

bots.updateStarRefProgram#778b5ab3 flags:# bot:InputUser commission_permille:int duration_months:flags.0?int = StarRefProgram;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [starRefProgram](/constructor/starRefProgram.md) | Info about an [affiliate program offered by a bot](/api/bots/referrals.md) |

### Methods

| Method | Description |
| --- | --- |
| [bots.updateStarRefProgram](/method/bots.updateStarRefProgram.md) | Create, edit or delete the [affiliate program](/api/bots/referrals.md) of a bot we own |

### Related pages

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.