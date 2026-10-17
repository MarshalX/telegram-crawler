# keyboardButtonRequestPoll

Button to request a poll from the user

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

When pressed, clients prompt the user to create and send a [poll](/api/poll.md), replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md). If `quiz` is set, the prompt must create a quiz poll.

```tl
keyboardButtonRequestPoll#7a11d782 flags:# style:flags.10?KeyboardButtonStyle quiz:flags.0?Bool text:string = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **quiz** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Bool](/type/Bool.md) | If set, only quiz polls can be sent |
| **text** | [string](/type/string.md) | Button text |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md)
Represents a reply keyboard

#### [Polls and quizzes](/api/poll.md)
Telegram allows sending polls and quizzes, that can be voted on by thousands, if not millions of users in chats and channels.