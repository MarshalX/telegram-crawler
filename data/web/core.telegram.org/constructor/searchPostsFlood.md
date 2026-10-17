# searchPostsFlood

Indicates if the specified [global post search »](/api/search.md#posts-tab) requires payment.

```tl
searchPostsFlood#3e0b5b6a flags:# query_is_free:flags.0?true total_daily:int remains:int wait_till:flags.1?int stars_amount:long = SearchPostsFlood;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_is\_free** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | The specified query is free (and it **will not use up free search slots**). |
| **total\_daily** | [int](/type/int.md) | Total number of daily free search slots. |
| **remains** | [int](/type/int.md) | Remaining number of free search slots. |
| **wait\_till** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | If there are no more search slots, specifies the unixtime when more search slots will be available. |
| **stars\_amount** | [long](/type/long.md) | The number of [Telegram Stars](/api/stars.md) to pay for each non-free search. |

### Type
[SearchPostsFlood](/type/SearchPostsFlood.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.