# factCheck

Represents a [fact-check »](/api/factcheck.md) created by an independent fact-checker.

```tl
factCheck#b89bfccf flags:# need_check:flags.0?true country:flags.1?string text:flags.1?TextWithEntities hash:long = FactCheck;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **need\_check** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the `country`/`text` fields will **not** be set, and the fact check must be fetched manually by the client (if it isn't already cached with the key specified in `hash`) using bundled [messages.getFactCheck](/method/messages.getFactCheck.md) requests, when the message with the factcheck scrolls into view. |
| **country** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | A two-letter ISO 3166-1 alpha-2 country code of the country for which the fact-check should be shown. |
| **text** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | The fact-check. |
| **hash** | [long](/type/long.md) | [Hash used for caching, for more info click here](/api/offsets.md#hash-generation) |

### Type
[FactCheck](/type/FactCheck.md)

### Related pages

#### [messages.getFactCheck](/method/messages.getFactCheck.md)
Fetch one or more [factchecks, see here »](/api/factcheck.md) for the full flow.

#### [Pagination in the API](/api/offsets.md)
How to fetch results from large lists of objects.

#### [Fact checks](/api/factcheck.md)
Telegram clients support displaying fact-checks added to messages by independent fact-checkers.