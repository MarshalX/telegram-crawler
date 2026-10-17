# messageActionStarGiftPurchaseOffer

Contains an offer to purchase a [collectible gift »](/api/gifts.md#collectible-gift-purchase-offers), see [here »](/api/gifts.md#collectible-gift-purchase-offers) for the full flow.

```tl
messageActionStarGiftPurchaseOffer#774278d4 flags:# accepted:flags.0?true declined:flags.1?true gift:StarGift price:StarsAmount expires_at:int = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **accepted** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the gift owner accepted this offer. |
| **declined** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the gift owner declined this offer. |
| **gift** | [StarGift](/type/StarGift.md) | The collectible gift the offer is about. |
| **price** | [StarsAmount](/type/StarsAmount.md) | Offered price. |
| **expires\_at** | [int](/type/int.md) | Offer expiration date (UNIX timestamp): if the owner doesn't act before this date, the offer will expire and the buyer will be refunded automatically. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.