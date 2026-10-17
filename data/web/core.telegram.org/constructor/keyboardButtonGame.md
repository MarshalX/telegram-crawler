# keyboardButtonGame

Button to start a game

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

When pressed, clients must open the [game](/constructor/game.md) from the attached [messageMediaGame](/constructor/messageMediaGame.md) constructor by invoking [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) with the `game` flag set, as described in [Starting a game](/api/bots/games.md#starting-a-game).

```tl
keyboardButtonGame#89c590f9 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
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

#### [game](/constructor/game.md)
Indicates an already sent game

#### [messageMediaGame](/constructor/messageMediaGame.md)
Telegram game

#### [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md)
Press an inline callback button and get a callback answer from the bot

#### [HTML5 games](/api/bots/games.md)
Bots can offer users HTML5 games to play solo or to compete against each other in groups and one-on-one chats.