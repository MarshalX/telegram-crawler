# inputKeyboardButtonUserProfile

Button that links directly to a user profile

Use this constructor to send a [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md) button in an [inline keyboard](/bots/features.md#inline-keyboards).

```tl
inputKeyboardButtonUserProfile#7d5e07c7 flags:# style:flags.10?KeyboardButtonStyle text:string user_id:InputUser = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md)
Button that links directly to a user profile

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must open the profile of the user identified by `user_id`.

#### [Telegram Bot Features](/bots/features.md)
This page describes individual bot elements in greater detail. For a general overview of bots, read the introduction to bots first.