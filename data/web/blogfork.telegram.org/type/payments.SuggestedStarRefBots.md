# Payments.SuggestedStarRefBots

A list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)

```tl
payments.suggestedStarRefBots#b4d5d859 flags:# count:int suggested_bots:Vector<StarRefProgram> users:Vector<User> next_offset:flags.0?string = payments.SuggestedStarRefBots;

---functions---

payments.getSuggestedStarRefBots#d6b48f7 flags:# order_by_revenue:flags.0?true order_by_date:flags.1?true peer:InputPeer offset:string limit:int = payments.SuggestedStarRefBots;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [payments.suggestedStarRefBots](/constructor/payments.suggestedStarRefBots.md) | A list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md) |

### Methods

| Method | Description |
| --- | --- |
| [payments.getSuggestedStarRefBots](/method/payments.getSuggestedStarRefBots.md) | Obtain a list of suggested [mini apps](/api/bots/webapps.md) with available [affiliate programs](/api/bots/referrals.md)\
\
`order_by_revenue` and `order_by_date` are mutually exclusive: if neither is set, results are sorted by profitability. |

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Affiliate programs](/api/bots/referrals.md)
Developers can open affiliate programs for their mini app – allowing content creators, other mini app developers and any Telegram user to promote it and earn commissions on purchases made by people they referred.