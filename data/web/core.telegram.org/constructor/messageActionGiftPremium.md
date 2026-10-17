# messageActionGiftPremium

Info about a gifted Telegram Premium subscription

This service message should be displayed below the appropriate sticker from the [inputStickerSetPremiumGifts »](/constructor/inputStickerSetPremiumGifts.md) [stickerset »](/api/stickers.md#stickersets):

- If `months == 1`, choose the sticker with emoji equal to "1️⃣"
- If `months == 3`, choose the sticker with emoji equal to "2️⃣"
- If `months == 6`, choose the sticker with emoji equal to "3️⃣"
- If `months == 12`, choose the sticker with emoji equal to "4️⃣"
- If `months == 24`, choose the sticker with emoji equal to "5️⃣"
- Otherwise, fallback to the sticker with emoji equal to "1️⃣"

```tl
messageActionGiftPremium#48e91302 flags:# currency:string amount:long days:int crypto_currency:flags.0?string crypto_amount:flags.0?long message:flags.1?TextWithEntities = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Price of the gift in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **days** | [int](/type/int.md) | Duration of the gifted Telegram Premium subscription, in days. |
| **crypto\_currency** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If the gift was bought using a cryptocurrency, the cryptocurrency name. |
| **crypto\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If the gift was bought using a cryptocurrency, price of the gift in the smallest units of a cryptocurrency. |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[TextWithEntities](/type/TextWithEntities.md) | Message attached with the gift |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md)
Stickers to show when receiving a gifted Telegram Premium subscription

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.