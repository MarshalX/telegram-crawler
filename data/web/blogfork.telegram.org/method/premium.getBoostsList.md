# premium.getBoostsList

Obtains info about the boosts that were applied to a certain channel or supergroup (admins only)

```tl
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;
---functions---
premium.getBoostsList#60f67660 flags:# gifts:flags.0?true peer:InputPeer offset:string limit:int = premium.BoostsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **gifts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to return only info about boosts received from [gift codes and giveaways created by the channel/supergroup »](/api/giveaways.md) |
| **peer** | [InputPeer](/type/InputPeer.md) | The channel/supergroup |
| **offset** | [string](/type/string.md) | Offset for pagination, obtained from [premium.boostsList](/constructor/premium.boostsList.md).`next_offset` |
| **limit** | [int](/type/int.md) | Maximum number of results to return, [see pagination](/api/offsets.md) |

### Result
[premium.BoostsList](/type/premium.BoostsList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Giveaways and gifts](/api/giveaways.md)
Telegram channel and supergroup administrators may launch giveaways to randomly distribute Telegram Premium subscriptions and other gifts among their followers, in exchange for boosts.

#### [premium.boostsList](/constructor/premium.boostsList.md)
List of [boosts](/api/boost.md) that were applied to a peer by multiple users.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.