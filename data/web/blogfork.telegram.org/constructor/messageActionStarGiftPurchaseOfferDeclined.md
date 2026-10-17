# messageActionStarGiftPurchaseOfferDeclined

A [collectible gift purchase offer »](/api/gifts.md#collectible-gift-purchase-offers) was declined, or the offer expired, see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

```tl
messageActionStarGiftPurchaseOfferDeclined#73ada76b flags:# expired:flags.0?true gift:StarGift price:StarsAmount = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **expired** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the owner didn't act before the [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md).`expires_at` deadline and the offer expired automatically; otherwise, the owner explicitly declined the offer. |
| **gift** | [StarGift](/type/StarGift.md) | The collectible gift the declined or expired offer was about. |
| **price** | [StarsAmount](/type/StarsAmount.md) | Offered price that is refunded automatically to the buyer. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [messageActionStarGiftPurchaseOffer](/constructor/messageActionStarGiftPurchaseOffer.md)
Contains an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.