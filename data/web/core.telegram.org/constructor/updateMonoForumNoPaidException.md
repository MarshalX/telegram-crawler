# updateMonoForumNoPaidException

An admin has (un)exempted this [monoforum topic »](/api/monoforum.md) from payment to send messages using [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md).

```tl
updateMonoForumNoPaidException#9f812b08 flags:# exception:flags.0?true channel_id:long saved_peer_id:Peer = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **exception** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, an admin has exempted this peer, otherwise the peer was unexempted. |
| **channel\_id** | [long](/type/long.md) | The monoforum ID. |
| **saved\_peer\_id** | [Peer](/type/Peer.md) | The peer/topic ID. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [account.toggleNoPaidMessagesException](/method/account.toggleNoPaidMessagesException.md)
Allow a user to send us messages without paying if [paid messages »](/api/paid-messages.md) are enabled.