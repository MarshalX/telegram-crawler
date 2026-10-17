# payments.starsStatus

Info about the current [Telegram Star subscriptions, balance and transaction history »](/api/stars.md#balance-and-transaction-history).

```tl
payments.starsStatus#6c9ce8ed flags:# balance:StarsAmount subscriptions:flags.1?Vector<StarsSubscription> subscriptions_next_offset:flags.2?string subscriptions_missing_balance:flags.4?long history:flags.3?Vector<StarsTransaction> next_offset:flags.0?string chats:Vector<Chat> users:Vector<User> = payments.StarsStatus;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **balance** | [StarsAmount](/type/StarsAmount.md) | Current Telegram Star balance. |
| **subscriptions** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[StarsSubscription](/type/StarsSubscription.md)&gt; | Info about current Telegram Star subscriptions, only returned when invoking [payments.getStarsTransactions](/method/payments.getStarsTransactions.md) and [payments.getStarsSubscriptions](/method/payments.getStarsSubscriptions.md). |
| **subscriptions\_next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Offset for pagination of subscriptions: only usable and returned when invoking [payments.getStarsSubscriptions](/method/payments.getStarsSubscriptions.md). |
| **subscriptions\_missing\_balance** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[long](/type/long.md) | The number of Telegram Stars the user should buy to be able to extend expired subscriptions soon (i.e. the current balance is not enough to extend all expired subscriptions). |
| **history** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[StarsTransaction](/type/StarsTransaction.md)&gt; | List of Telegram Star transactions (partial if `next_offset` is set). |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset to use to fetch more transactions from the transaction history using [payments.getStarsTransactions](/method/payments.getStarsTransactions.md). |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Chats mentioned in `history`. |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Users mentioned in `history`. |

### Type
[payments.StarsStatus](/type/payments.StarsStatus.md)

### Related pages

#### [payments.getStarsTransactions](/method/payments.getStarsTransactions.md)
Fetch [Telegram Stars transactions](/api/stars.md#balance-and-transaction-history).

The `inbound` and `outbound` flags are mutually exclusive: if none of the two are set, both incoming and outgoing transactions are fetched.

#### [payments.getStarsSubscriptions](/method/payments.getStarsSubscriptions.md)
Obtain a list of active, expired or cancelled [Telegram Star subscriptions »](/api/invites.md#paid-invite-links).

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.