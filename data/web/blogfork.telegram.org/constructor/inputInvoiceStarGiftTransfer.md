# inputInvoiceStarGiftTransfer

Used to [pay to transfer a collectible gift to another peer](/api/gifts.md#transferring-collectible-gifts), see the [gifts »](/api/gifts.md#transferring-collectible-gifts) documentation for more info.

```tl
inputInvoiceStarGiftTransfer#4a5f5bd9 stargift:InputSavedStarGift to_id:InputPeer = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The identifier of the received gift |
| **to\_id** | [InputPeer](/type/InputPeer.md) | The destination peer |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.