# keyboardButtonBuy

Button to buy a product

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must start the [payment flow for the attached invoice](/api/payments.md).

```tl
keyboardButtonBuy#3fa53905 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [replyInlineMarkup](/constructor/replyInlineMarkup.md)
Represents an inline keyboard

#### [Payments API](/api/payments.md)
You can accept payments from Telegram users via Telegram Bots.