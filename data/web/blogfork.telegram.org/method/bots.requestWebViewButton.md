# bots.requestWebViewButton

Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

```tl
bots.requestedButton#f13bbcd7 webapp_req_id:string = bots.RequestedButton;
---functions---
bots.requestWebViewButton#31a2a35e user_id:InputUser button:KeyboardButton = bots.RequestedButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | The user that will use the prepared button in the Mini App |
| **button** | [KeyboardButton](/type/KeyboardButton.md) | The button to prepare, an [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) of any [RequestPeerType](/type/RequestPeerType.md) |

### Result
[bots.RequestedButton](/type/bots.RequestedButton.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BUTTON\_INVALID | The specified button is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

Use this constructor to send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button in a [reply keyboard](/bots/features.md#keyboards) in a private chat.

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

#### [RequestPeerType](/type/RequestPeerType.md)
Filtering criteria to use for the peer selection list shown to the user.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.