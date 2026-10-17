# payments.getStarsSubscriptions

Obtain a list of active, expired or cancelled [Telegram Star subscriptions »](/api/invites.md#paid-invite-links).

```tl
payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
---functions---
payments.getStarsSubscriptions#32512c5 flags:# missing_balance:flags.0?true peer:InputPeer offset:string = payments.StarsStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **missing\_balance** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to return only subscriptions expired due to an excessively low Telegram Star balance. |
| **peer** | [InputPeer](/type/InputPeer.md) | Always pass [inputPeerSelf](/constructor/inputPeerSelf.md). |
| **offset** | [string](/type/string.md) | Offset for pagination, taken from [payments.starsStatus](/constructor/payments.starsStatus.md).`subscriptions_next_offset`. |

### Result
[payments.StarsStatus](/type/payments.StarsStatus.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [inputPeerSelf](/constructor/inputPeerSelf.md)
Defines the current user.

#### [payments.starsStatus](/constructor/payments.starsStatus.md)
Info about the current [Telegram Star subscriptions, balance and transaction history »](/api/stars.md#balance-and-transaction-history).

#### [Invite links](/api/invites.md)
Chats and channels may have a public username or a private invite link: private invite links may be further enhanced with per-user join requests.