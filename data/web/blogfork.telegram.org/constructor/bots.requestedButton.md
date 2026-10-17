# bots.requestedButton

Contains the request ID a bot should pass to a [Mini App](/api/bots/webapps.md) after preparing a peer request button with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

```tl
bots.requestedButton#f13bbcd7 webapp_req_id:string = bots.RequestedButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **webapp\_req\_id** | [string](/type/string.md) | Mini App request ID, to be passed by the bot to the Mini App and then back to [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md) and [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) |

### Type
[bots.RequestedButton](/type/bots.RequestedButton.md)

### Related pages

#### [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md)
Fetch the peer request button a bot prepared for a [Mini App](/api/bots/webapps.md) with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), invoked when the Mini App emits a [`web_app_request_chat`](/api/web-events.md#web-app-request-chat) event, see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

#### [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)
Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [bots.requestWebViewButton](/method/bots.requestWebViewButton.md)
Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.