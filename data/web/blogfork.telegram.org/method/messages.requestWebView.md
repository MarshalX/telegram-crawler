# messages.requestWebView

Open a [bot mini app](/bots/webapps.md), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.

```tl
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
---functions---
messages.requestWebView#269dc2c1 flags:# from_bot_menu:flags.4?true silent:flags.5?true compact:flags.7?true fullscreen:flags.8?true peer:InputPeer bot:InputUser url:flags.1?string start_param:flags.3?string theme_params:flags.2?DataJSON platform:string reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = WebViewResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **from\_bot\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | Whether the webview was opened by clicking on the bot's [menu button »](/api/bots/menu.md). |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the inline message that will be sent by the bot on behalf of the user once the web app interaction is [terminated](/method/messages.sendWebViewResultMessage.md) should be sent silently (no notifications for the receivers). |
| **compact** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, requests to open the mini app in compact mode (as opposed to normal or fullscreen mode). Must be set if the `mode` parameter of the [attachment menu deep link](/api/links.md#bot-attachment-or-side-menu-links) is equal to `compact`. |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, requests to open the mini app in fullscreen mode (as opposed to normal or compact mode). Must be set if the `mode` parameter of the [attachment menu deep link](/api/links.md#bot-attachment-or-side-menu-links) is equal to `fullscreen`. |
| **peer** | [InputPeer](/type/InputPeer.md) | Dialog where the web app is being opened, and where the resulting message will be sent (see the [docs for more info »](/api/bots/webapps.md)). |
| **bot** | [InputUser](/type/InputUser.md) | Bot that owns the [web app](/api/bots/webapps.md) |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | [Web app URL](/api/bots/webapps.md) |
| **start\_param** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | If the web app was opened from the attachment menu using a [attachment menu deep link](/api/links.md#bot-attachment-or-side-menu-links), `start_param` should contain the `data` from the `startattach` parameter. |
| **theme\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[DataJSON](/type/DataJSON.md) | [Theme parameters »](/api/bots/webapps.md#theme-parameters) |
| **platform** | [string](/type/string.md) | Short name of the application; 0-64 English letters, digits, and underscores |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the inline message that will be sent by the bot on behalf of the user once the web app interaction is [terminated](/method/messages.sendWebViewResultMessage.md) should be sent in reply to the specified message or story. |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Open the web app as the specified peer, sending the resulting the message as the specified peer. |

### Result
[WebViewResult](/type/WebViewResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | BOT\_WEBVIEW\_DISABLED | A webview cannot be opened in the specified conditions: emitted for example if `from_bot_menu` or `url` are set and `peer` is not the chat with the bot. |
| 403 | CHAT\_WRITE\_FORBIDDEN | You can't write in this chat. |
| 400 | INPUT\_USER\_DEACTIVATED | The specified user was deleted. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 403 | PRIVACY\_PREMIUM\_REQUIRED | You need a [Telegram Premium subscription](/api/premium.md) to send a message to this user. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |
| 400 | THEME\_PARAMS\_INVALID | The specified `theme_params` field is invalid. |
| 400 | URL\_INVALID | Invalid URL provided. |
| 400 | YOU\_BLOCKED\_USER | You blocked this user. |

### Related pages

#### [Bot menu button](/api/bots/menu.md)
Bots can choose the behavior of the menu button shown next to the text input field.

#### [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md)
Terminate webview interaction started with [messages.requestWebView](/method/messages.requestWebView.md), sending the specified message to the chat on behalf of the user.

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Telegram Mini Apps](/bots/webapps.md)

#### [messages.prolongWebView](/method/messages.prolongWebView.md)
Indicate to the server (from the user side) that the user is still using a web app.

If the method returns a `QUERY_ID_INVALID` error, the webview must be closed.

#### [Telegram Premium](/api/premium.md)
Telegram Premium is an optional subscription service that unlocks additional exclusive client-side and API-side features, while helping support the development of the app.