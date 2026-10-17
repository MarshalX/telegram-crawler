# RequirementToContact

Specifies a requirement that must be satisfied in order to contact a user.

```tl
requirementToContactEmpty#50a9839 = RequirementToContact;
requirementToContactPremium#e581e4e9 = RequirementToContact;
requirementToContactPaidMessages#b4f67e93 stars_amount:long = RequirementToContact;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [requirementToContactEmpty](/constructor/requirementToContactEmpty.md) | This user can be freely contacted. |
| [requirementToContactPremium](/constructor/requirementToContactPremium.md) | This user requires us to buy a [Premium](/api/premium.md) subscription in order to contact them. |
| [requirementToContactPaidMessages](/constructor/requirementToContactPaidMessages.md) | This user requires us to pay the specified amount of [Telegram Stars](/api/stars.md) to send them a message, see [here »](/api/paid-messages.md) for the full flow. |