# inputStarsTransaction

Used to fetch info about a [Telegram Star transaction »](/api/stars.md#balance-and-transaction-history).

```tl
inputStarsTransaction#206ae6d1 flags:# refund:flags.0?true id:string = InputStarsTransaction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **refund** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, fetches info about the refund transaction for this transaction. |
| **id** | [string](/type/string.md) | Transaction ID. |

### Type
[InputStarsTransaction](/type/InputStarsTransaction.md)

### Related pages

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.