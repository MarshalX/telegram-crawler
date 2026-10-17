# inputKeyboardButtonRequestPeer

Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

Use this constructor to send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button in a [reply keyboard](/bots/features.md#keyboards) in a private chat.

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

```tl
inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **name\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to request the peer's name. |
| **username\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag to request the peer's `@username` (if any). |
| **photo\_requested** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Set this flag to request the peer's photo (if any). |
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

#### [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

#### [Telegram Bot Features](/bots/features.md)
This page describes individual bot elements in greater detail. For a general overview of bots, read the introduction to bots first.