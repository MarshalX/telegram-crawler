# messageActionGiftStars

You gifted or were gifted some [Telegram Stars](/api/stars.md).

This service message should be displayed below the appropriate sticker from the [inputStickerSetPremiumGifts »](/constructor/inputStickerSetPremiumGifts.md) [stickerset »](/api/stickers.md#stickersets):

- If `stars <= 1000`, choose the sticker with emoji equal to "2️⃣"
- If `stars < 2500`, choose the sticker with emoji equal to "3️⃣"
- Otherwise, choose the sticker with emoji equal to "4️⃣"

```tl
messageActionGiftStars#45d5b021 flags:# currency:string amount:long stars:long crypto_currency:flags.0?string crypto_amount:flags.0?long transaction_id:flags.1?string = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **currency** | [string](/type/string.md) | Three-letter ISO 4217 [currency](/bots/payments.md#supported-currencies) code |
| **amount** | [long](/type/long.md) | Price of the gift in the smallest units of the currency (integer, not float/double). For example, for a price of `US$ 1.45` pass `amount = 145`. See the exp parameter in [currencies.json](/bots/payments/currencies.json), it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). |
| **stars** | [long](/type/long.md) | Amount of gifted stars |
| **crypto\_currency** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If the gift was bought using a cryptocurrency, the cryptocurrency name. |
| **crypto\_amount** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If the gift was bought using a cryptocurrency, price of the gift in the smallest units of a cryptocurrency. |
| **transaction\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Identifier of the transaction, only visible to the receiver of the gift. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Bot Payments API](/bots/payments.md)

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [inputStickerSetPremiumGifts](/constructor/inputStickerSetPremiumGifts.md)
Stickers to show when receiving a gifted Telegram Premium subscription

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.