# keyboardButtonStyle

This constructor allows setting a custom background color and custom emoji label for a button, see [here »](/api/bots/buttons.md#button-styles) for more info.

```tl
keyboardButtonStyle#4fdd3430 flags:# bg_primary:flags.0?true bg_danger:flags.1?true bg_success:flags.2?true icon:flags.3?long = KeyboardButtonStyle;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bg\_primary** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | A dark blue color, recommended for main actions. |
| **bg\_danger** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | A red color, recommended for destructive actions. |
| **bg\_success** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | A green color, recommended for positive actions. |
| **icon** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[long](/type/long.md) | The ID of a [custom emoji](/api/custom-emoji.md) to be displayed before the button's label. |

### Type
[KeyboardButtonStyle](/type/KeyboardButtonStyle.md)

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.