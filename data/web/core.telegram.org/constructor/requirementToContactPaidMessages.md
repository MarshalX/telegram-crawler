# requirementToContactPaidMessages

This user requires us to pay the specified amount of [Telegram Stars](/api/stars.md) to send them a message, see [here »](/api/paid-messages.md) for the full flow.

```tl
requirementToContactPaidMessages#b4f67e93 stars_amount:long = RequirementToContact;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stars\_amount** | [long](/type/long.md) | The required amount of [Telegram Stars](/api/stars.md). |

### Type
[RequirementToContact](/type/RequirementToContact.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.