# payments.getConnectedStarRefBots

Fetch all affiliations we have created for a certain peer

```tl
payments.connectedStarRefBots#98d5ea1d count:int connected_bots:Vector<ConnectedBotStarRef> users:Vector<User> = payments.ConnectedStarRefBots;
---functions---
payments.getConnectedStarRefBots#5869a553 flags:# peer:InputPeer offset_date:flags.2?int offset_link:flags.2?string limit:int = payments.ConnectedStarRefBots;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The affiliated peer |
| **offset\_date** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | If set, returns only results older than the specified unixtime |
| **offset\_link** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | Offset for [pagination](/api/offsets.md), taken from the last returned [connectedBotStarRef](/constructor/connectedBotStarRef.md).`url` (initially empty) |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[payments.ConnectedStarRefBots](/type/payments.ConnectedStarRefBots.md)

### Only users can use this method

### Related pages

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [connectedBotStarRef](/constructor/connectedBotStarRef.md)
Info about an [active affiliate program we have with a Mini App](/api/bots/referrals.md#becoming-an-affiliate)