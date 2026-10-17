# payments.getStarsTransactionsByID

Obtain info about [Telegram Star transactions »](/api/stars.md#balance-and-transaction-history) using specific transaction IDs.

```tl
payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
---functions---
payments.getStarsTransactionsByID#2dca16b8 flags:# ton:flags.0?true peer:InputPeer id:Vector<InputStarsTransaction> = payments.StarsStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **ton** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, returns channel/bot ad revenue transactions in nanograms. |
| **peer** | [InputPeer](/type/InputPeer.md) | Channel or bot. |
| **id** | [Vector](/type/Vector%20t)&lt;[InputStarsTransaction](/type/InputStarsTransaction.md)&gt; | Transaction IDs. |

### Result
[payments.StarsStatus](/type/payments.StarsStatus.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | TRANSACTION\_ID\_INVALID | The specified transaction ID is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.