# account.getPaidMessagesRevenue

Get the number of stars we have received from the specified user thanks to [paid messages »](/api/paid-messages.md); the received amount will be equal to the sent amount multiplied by [stars\_paid\_message\_commission\_permille](/api/config.md#stars-paid-message-commission-permille) divided by 1000.

```tl
account.paidMessagesRevenue#1e109708 stars_amount:long = account.PaidMessagesRevenue;
---functions---
account.getPaidMessagesRevenue#19ba4a67 flags:# parent_peer:flags.0?InputPeer user_id:InputUser = account.PaidMessagesRevenue;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **parent\_peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputPeer](/type/InputPeer.md) | If set, can contain the ID of a [monoforum (channel direct messages)](/api/monoforum.md) to obtain the number of stars the user has spent to send us direct messages via the channel. |
| **user\_id** | [InputUser](/type/InputUser.md) | The user that paid to send us messages. |

### Result
[account.PaidMessagesRevenue](/type/account.PaidMessagesRevenue.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PARENT\_PEER\_INVALID | The specified `parent_peer` is invalid. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.