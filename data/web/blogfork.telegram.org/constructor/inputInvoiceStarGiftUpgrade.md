# inputInvoiceStarGiftUpgrade

Used to [pay to upgrade a Gift to a collectible gift](/api/gifts.md#upgrade-a-gift-to-a-collectible-gift), see the [collectible gifts »](/api/gifts.md#collectible-gifts) documentation for more info on the full flow.

```tl
inputInvoiceStarGiftUpgrade#4d818d5d flags:# keep_original_details:flags.0?true stargift:InputSavedStarGift = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **keep\_original\_details** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to keep the original gift text, sender and receiver in the upgraded gift as a [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute. |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The identifier of the received gift to upgrade. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.