# keyboardButtonRequestPeer

Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

```tl
keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |
| **button\_id** | [int](/type/int.md) | Button ID, to be passed to [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md). |
| **peer\_type** | [RequestPeerType](/type/RequestPeerType.md) | Filtering criteria to use for the peer selection list shown to the user. \
The list should display all existing peers of the specified type, and should also offer an option for the user to create and immediately use one or more (up to `max_quantity`) peers of the specified type, if needed. |
| **max\_quantity** | [int](/type/int.md) | Maximum number of peers that can be chosen. |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)
Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

#### [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md)
Represents a reply keyboard