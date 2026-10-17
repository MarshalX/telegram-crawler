# account.PaidMessagesRevenue

Total number of non-refunded [Telegram Stars](/api/stars.md) a user has spent on sending us messages either directly or through a channel, see [here »](/api/paid-messages.md) for more info on paid messages.

```tl
account.paidMessagesRevenue#1e109708 stars_amount:long = account.PaidMessagesRevenue;

---functions---

account.getPaidMessagesRevenue#19ba4a67 flags:# parent_peer:flags.0?InputPeer user_id:InputUser = account.PaidMessagesRevenue;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [account.paidMessagesRevenue](/constructor/account.paidMessagesRevenue.md) | Total number of non-refunded [Telegram Stars](/api/stars.md) a user has spent on sending us messages either directly or through a channel, see [here »](/api/paid-messages.md) for more info on paid messages. |

### Methods

| Method | Description |
| --- | --- |
| [account.getPaidMessagesRevenue](/method/account.getPaidMessagesRevenue.md) | Get the number of stars we have received from the specified user thanks to [paid messages »](/api/paid-messages.md); the received amount will be equal to the sent amount multiplied by [stars\_paid\_message\_commission\_permille](/api/config.md#stars-paid-message-commission-permille) divided by 1000. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.