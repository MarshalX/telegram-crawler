# payments.getStarsTransactions

Fetch [Telegram Stars transactions](/api/stars.md#balance-and-transaction-history).

The `inbound` and `outbound` flags are mutually exclusive: if none of the two are set, both incoming and outgoing transactions are fetched.

```tl
payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
---functions---
payments.getStarsTransactions#69da4557 flags:# inbound:flags.0?true outbound:flags.1?true ascending:flags.2?true ton:flags.4?true subscription_id:flags.3?string peer:InputPeer offset:string limit:int = payments.StarsStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inbound** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, fetches only incoming transactions. |
| **outbound** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, fetches only outgoing transactions. |
| **ascending** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Return transactions in ascending order by date (instead of descending order by date). |
| **ton** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, returns the channel/ad revenue transactions in nanograms, instead. |
| **subscription\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | If set, fetches only transactions for the specified [Telegram Star subscription »](/api/stars.md#star-subscriptions). |
| **peer** | [InputPeer](/type/InputPeer.md) | Fetch the transaction history of the peer ([inputPeerSelf](/constructor/inputPeerSelf.md) or a bot we own). |
| **offset** | [string](/type/string.md) | [Offset for pagination, obtained from the returned `next_offset`, initially an empty string »](/api/offsets.md). |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.StarsStatus](/type/payments.StarsStatus.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SUBSCRIPTION\_ID\_INVALID | The specified subscription_id is invalid. |

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.