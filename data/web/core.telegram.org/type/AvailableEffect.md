# AvailableEffect

Describes a [message effect »](/api/effects.md).

```tl
availableEffect#93c3e27e flags:# premium_required:flags.2?true id:long emoticon:string static_icon_id:flags.0?long effect_sticker_id:long effect_animation_id:flags.1?long = AvailableEffect;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [availableEffect](/constructor/availableEffect.md) | Represents a [message effect »](/api/effects.md).\
\
All `long` IDs except for `id` are [document](/constructor/document.md).`id`s from the containing [messages.availableEffects](/constructor/messages.availableEffects.md) constructor.\
\
See [here »](/api/effects.md) for more info on how to use following fields. |

### Related pages

#### [Animated message effects](/api/effects.md)
Telegram allows adding spectacular animated effects to messages you send.