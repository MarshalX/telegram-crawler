# availableEffect

Represents a [message effect »](/api/effects.md).

All `long` IDs except for `id` are [document](/constructor/document.md).`id`s from the containing [messages.availableEffects](/constructor/messages.availableEffects.md) constructor.

See [here »](/api/effects.md) for more info on how to use following fields.

```tl
availableEffect#93c3e27e flags:# premium_required:flags.2?true id:long emoticon:string static_icon_id:flags.0?long effect_sticker_id:long effect_animation_id:flags.1?long = AvailableEffect;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **premium\_required** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether a [Premium](/api/premium.md) subscription is required to use this effect. |
| **id** | [long](/type/long.md) | Unique effect ID. |
| **emoticon** | [string](/type/string.md) | Emoji corresponding to the effect, to be used as icon for the effect if `static_icon_id` is not set. |
| **static\_icon\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | ID of the document containing the static icon (WEBP) of the effect. |
| **effect\_sticker\_id** | [long](/type/long.md) | Contains the preview [animation (TGS format »)](/api/stickers.md#animated-stickers), used for the effect selection menu. |
| **effect\_animation\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | If set, contains the actual animated effect [(TGS format »)](/api/stickers.md#animated-stickers). If not set, the animated effect must be set equal to the [premium animated sticker effect](/api/stickers.md#premium-animated-sticker-effects) associated to the animated sticker specified in `effect_sticker_id` (always different from the preview animation, fetched thanks to the [videoSize](/constructor/videoSize.md) of type `f` as specified [here »](/api/stickers.md#premium-animated-sticker-effects)). |

### Type
[AvailableEffect](/type/AvailableEffect.md)

### Related pages

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.

#### [videoSize](/constructor/videoSize.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) in MPEG4 format

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.

#### [document](/constructor/document.md)
Document

#### [messages.availableEffects](/constructor/messages.availableEffects.md)
The full list of usable [animated message effects »](/api/effects.md).