# messageActionPaidMessagesRefunded

Sent from peer A to B, indicates that A refunded all [stars](/api/stars.md) B previously paid to send messages to A, see [here »](/api/paid-messages.md) for more info on paid messages.

```tl
messageActionPaidMessagesRefunded#ac1f1fcd count:int stars:long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **count** | [int](/type/int.md) | Number of paid messages affected by the refund. |
| **stars** | [long](/type/long.md) | Number of refunded stars. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.