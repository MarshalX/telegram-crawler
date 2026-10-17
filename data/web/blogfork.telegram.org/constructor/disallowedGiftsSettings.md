# disallowedGiftsSettings

Disallow the reception of specific [gift](/api/gifts.md) types.

```tl
disallowedGiftsSettings#71f276c4 flags:# disallow_unlimited_stargifts:flags.0?true disallow_limited_stargifts:flags.1?true disallow_unique_stargifts:flags.2?true disallow_premium_gifts:flags.3?true disallow_stargifts_from_channels:flags.4?true = DisallowedGiftsSettings;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **disallow\_unlimited\_stargifts** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Disallow the reception of gifts with an unlimited supply (those with the [starGift](/constructor/starGift.md).`limited` flag **not** set). |
| **disallow\_limited\_stargifts** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Disallow the reception of limited-supply gifts (those with the [starGift](/constructor/starGift.md).`limited` flag set). |
| **disallow\_unique\_stargifts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Disallow the reception of [collectible gifts »](/api/gifts.md#collectible-gifts). |
| **disallow\_premium\_gifts** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Disallow the reception of [gifted Telegram Premium subscriptions »](/api/gifts.md#collectible-gifts). |
| **disallow\_stargifts\_from\_channels** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Disallow the reception of gifts sent by channels. |

### Type
[DisallowedGiftsSettings](/type/DisallowedGiftsSettings.md)

### Related pages

#### [starGift](/constructor/starGift.md)
Represents a [star gift, see here »](/api/gifts.md) for more info.

#### [Telegram Gifts](/api/gifts.md)
Users can send Gifts to their friends. The recipients of gifts can display them on their profile pages or turn them into Telegram Stars &raquo;. Telegram Stars can be used for many things, including supporting creators and buying services in mini apps.