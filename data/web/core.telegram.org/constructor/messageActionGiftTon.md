# messageActionGiftTon

You were gifted some Grams.

This service message should be displayed below the appropriate sticker from the [inputStickerSetTonGifts »](/constructor/inputStickerSetTonGifts.md) [stickerset »](/api/stickers.md#stickersets):

- If `crypto_amount <= 10_000_000_000`, choose the sticker with emoji equal to "2️⃣"
- If `crypto_amount <= 50_000_000_000`, choose the sticker with emoji equal to "1️⃣"
- Otherwise, choose the sticker with emoji equal to "3️⃣"

```tl
messageActionGiftTon#a8a3c699 flags:# currency:string amount:long crypto_currency:string crypto_amount:long transaction_id:flags.0?string = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **currency** | [string](/type/string.md) | Name of a localized FIAT currency. |
| **amount** | [long](/type/long.md) | FIAT currency equivalent (in the currency specified in `currency`) of the amount specified in `crypto_amount`. |
| **crypto\_currency** | [string](/type/string.md) | Name of the cryptocurrency. |
| **crypto\_amount** | [long](/type/long.md) | Amount in the smallest unit of the cryptocurrency (for TONs, one billionth of a ton, AKA a nanogram). |
| **transaction\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Transaction ID. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [inputStickerSetTonGifts](/constructor/inputStickerSetTonGifts.md)
TON gifts stickerset.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.