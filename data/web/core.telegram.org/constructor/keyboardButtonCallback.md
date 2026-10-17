# keyboardButtonCallback

Callback button

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients send `data` to the bot, optionally providing the user's [2FA SRP parameters](/api/srp.md) for identity verification, as described in [callback queries](/api/bots/buttons.md#callback-queries).

```tl
keyboardButtonCallback#e62bc960 flags:# requires_password:flags.0?true style:flags.10?KeyboardButtonStyle text:string data:bytes = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **requires\_password** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the user should verify his identity by entering his [2FA SRP parameters](/api/srp.md) to the [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) method. NOTE: telegram and the bot WILL NOT have access to the plaintext password, thanks to [SRP](/api/srp.md). This button is mainly used by the official [@botfather](https://t.me/botfather) bot, for verifying the user's identity before transferring ownership of a bot to another user. |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |
| **data** | [bytes](/type/bytes.md) | Callback data |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Two-factor authentication](/api/srp.md)
How to login to a user's account if they have enabled 2FA, how to change password.

#### [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md)
Press an inline callback button and get a callback answer from the bot

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [replyInlineMarkup](/constructor/replyInlineMarkup.md)
Represents an inline keyboard