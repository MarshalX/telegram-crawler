# inputInvoiceStarGiftResale

Used to buy a [collectible gift](/api/gifts.md#collectible-gifts) currently up on resale, see [here](/api/gifts.md#reselling-collectible-gifts) for more info on the full flow.

```tl
inputInvoiceStarGiftResale#c39f5324 flags:# ton:flags.0?true slug:string to_id:InputPeer = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **ton** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Buy the gift using TON. |
| **slug** | [string](/type/string.md) | Slug of the gift to buy. |
| **to\_id** | [InputPeer](/type/InputPeer.md) | The receiver of the gift. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.