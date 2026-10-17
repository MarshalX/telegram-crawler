# bots.getRequestedWebViewButton

Fetch the peer request button a bot prepared for a [Mini App](/api/bots/webapps.md) with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), invoked when the Mini App emits a [`web_app_request_chat`](/api/web-events.md#web-app-request-chat) event, see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

```tl
keyboardButton#7d170cff flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonUrl#d80c25ec flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonCallback#e62bc960 flags:# requires_password:flags.0?true style:flags.10?KeyboardButtonStyle text:string data:bytes = KeyboardButton;
keyboardButtonRequestPhone#417efd8f flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonRequestGeoLocation#aa40f94d flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonSwitchInline#991399fc flags:# same_peer:flags.0?true style:flags.10?KeyboardButtonStyle text:string query:string peer_types:flags.1?Vector<InlineQueryPeerType> = KeyboardButton;
keyboardButtonGame#89c590f9 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonBuy#3fa53905 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonUrlAuth#f51006f9 flags:# style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.0?string url:string button_id:int = KeyboardButton;
inputKeyboardButtonUrlAuth#68013e72 flags:# request_write_access:flags.0?true style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.1?string url:string bot:InputUser = KeyboardButton;
keyboardButtonRequestPoll#7a11d782 flags:# style:flags.10?KeyboardButtonStyle quiz:flags.0?Bool text:string = KeyboardButton;
inputKeyboardButtonUserProfile#7d5e07c7 flags:# style:flags.10?KeyboardButtonStyle text:string user_id:InputUser = KeyboardButton;
keyboardButtonUserProfile#c0fd5d09 flags:# style:flags.10?KeyboardButtonStyle text:string user_id:long = KeyboardButton;
keyboardButtonWebView#e846b1a0 flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonSimpleWebView#e15c4370 flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
keyboardButtonCopy#bcc4af10 flags:# style:flags.10?KeyboardButtonStyle text:string copy_text:string = KeyboardButton;
---functions---
bots.getRequestedWebViewButton#bf25b7f3 bot:InputUser webapp_req_id:string = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot that owns the Mini App |
| **webapp\_req\_id** | [string](/type/string.md) | The Mini App request ID, taken from the [`web_app_request_chat`](/api/web-events.md#web-app-request-chat) event's `req_id` |

### Result
[KeyboardButton](/type/KeyboardButton.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_ID\_INVALID | The specified bot ID is invalid. |
| 400 | WEBAPP\_REQ\_ID\_INVALID | The specified webapp_req_id is invalid. |

### Related pages

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [bots.requestWebViewButton](/method/bots.requestWebViewButton.md)
Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.