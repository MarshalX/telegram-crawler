# premium.boostsList

List of [boosts](/api/boost.md) that were applied to a peer by multiple users.

```tl
premium.boostsList#86f8613c flags:# count:int boosts:Vector<Boost> next_offset:flags.0?string users:Vector<User> = premium.BoostsList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of results |
| **boosts** | [Vector](/type/Vector%20t)&lt;[Boost](/type/Boost.md)&gt; | [Boosts](/api/boost.md) |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset that can be used for [pagination](/api/offsets.md). |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[premium.BoostsList](/type/premium.BoostsList.md)

### Related pages

#### [Channel and supergroup boosts](/api/boost.md)
Telegram Premium users can grant their favorite channels and supergroups additional features like the ability to post stories by giving them boosts.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.