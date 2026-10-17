# inputInvoiceStarGiftDropOriginalDetails

Used to pay for for the removal of the [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute from a collectible gift, see [here »](/api/gifts.md#dropping-the-original-details-of-an-upgraded-gift) for the full flow.

```tl
inputInvoiceStarGiftDropOriginalDetails#923d8d1 stargift:InputSavedStarGift = InputInvoice;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stargift** | [InputSavedStarGift](/type/InputSavedStarGift.md) | The collectible gift whose [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md) attribute should be removed. |

### Type
[InputInvoice](/type/InputInvoice.md)

### Related pages

#### [starGiftAttributeOriginalDetails](/constructor/starGiftAttributeOriginalDetails.md)
Info about the sender, receiver and message attached to the original [gift »](/api/gifts.md), before it was upgraded to a [collectible gift »](/api/gifts.md#collectible-gifts).

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.