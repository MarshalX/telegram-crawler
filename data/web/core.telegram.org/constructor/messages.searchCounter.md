# messages.searchCounter

Indicates how many results would be found by a [messages.search](/method/messages.search.md) call with the same parameters

```tl
messages.searchCounter#e844ebff flags:# inexact:flags.1?true filter:MessagesFilter count:int = messages.SearchCounter;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inexact** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the results may be inexact |
| **filter** | [MessagesFilter](/type/MessagesFilter.md) | Provided message filter |
| **count** | [int](/type/int.md) | Number of results that were found server-side |

### Type
[messages.SearchCounter](/type/messages.SearchCounter.md)

### Related pages

#### [messages.search](/method/messages.search.md)
Search for messages.