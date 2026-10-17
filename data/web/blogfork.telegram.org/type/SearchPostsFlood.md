# SearchPostsFlood

Indicates if the specified [global post search »](/api/search.md#posts-tab) requires payment.

```tl
searchPostsFlood#3e0b5b6a flags:# query_is_free:flags.0?true total_daily:int remains:int wait_till:flags.1?int stars_amount:long = SearchPostsFlood;

---functions---

channels.checkSearchPostsFlood#22567115 flags:# query:flags.0?string = SearchPostsFlood;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [searchPostsFlood](/constructor/searchPostsFlood.md) | Indicates if the specified [global post search »](/api/search.md#posts-tab) requires payment. |

### Methods

| Method | Description |
| --- | --- |
| [channels.checkSearchPostsFlood](/method/channels.checkSearchPostsFlood.md) | Check if the specified [global post search »](/api/search.md#posts-tab) requires payment. |

### Related pages

#### [Search and filters](/api/search.md)
Telegram allows applying detailed message filters while looking for messages in chats.