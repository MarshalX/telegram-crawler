# keyboardButtonRequestPhone

Button to request a user's phone number

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

When pressed, clients must request permission from the user to send the current user's contact to the chat, replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md).

```tl
keyboardButtonRequestPhone#417efd8f flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
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

#### [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md)
Represents a reply keyboard