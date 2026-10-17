# messages.requestAppWebView

Open a [bot mini app](/bots/webapps.md) from a [direct Mini App deep link](/api/links.md#direct-mini-app-links), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.

```tl
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
---functions---
messages.requestAppWebView#53618bce flags:# write_allowed:flags.0?true compact:flags.7?true fullscreen:flags.8?true peer:InputPeer app:InputBotApp start_param:flags.1?string theme_params:flags.2?DataJSON platform:string = WebViewResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **write\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag if the bot is asking permission to send messages to the user as specified in the [direct Mini App deep link](/api/links.md#direct-mini-app-links) docs, and the user agreed. |
| **compact** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, requests to open the mini app in compact mode (as opposed to normal or fullscreen mode). Must be set if the `mode` parameter of the [direct Mini App deep link](/api/links.md#direct-mini-app-links) is equal to `compact`. |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, requests to open the mini app in fullscreen mode (as opposed to compact or normal mode). Must be set if the `mode` parameter of the [direct Mini App deep link](/api/links.md#direct-mini-app-links) is equal to `fullscreen`. |
| **peer** | [InputPeer](/type/InputPeer.md) | If the client has clicked on the link in a Telegram chat, pass the chat's peer information; otherwise pass the bot's peer information, instead. |
| **app** | [InputBotApp](/type/InputBotApp.md) | The app obtained by invoking [messages.getBotApp](/method/messages.getBotApp.md) as specified in the [direct Mini App deep link](/api/links.md#direct-mini-app-links) docs. |
| **start\_param** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If the `startapp` query string parameter is present in the [direct Mini App deep link](/api/links.md#direct-mini-app-links), pass it to `start_param`. |
| **theme\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[DataJSON](/type/DataJSON.md) | [Theme parameters »](/api/bots/webapps.md#theme-parameters) |
| **platform** | [string](/type/string.md) | Short name of the application; 0-64 English letters, digits, and underscores |

### Result
[WebViewResult](/type/WebViewResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_APP\_BOT\_INVALID | The bot_id passed in the inputBotAppShortName constructor is invalid. |
| 400 | BOT\_APP\_INVALID | The specified bot app is invalid. |
| 400 | BOT\_APP\_SHORTNAME\_INVALID | The specified bot app short name is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | THEME\_PARAMS\_INVALID | The specified `theme_params` field is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [messages.getBotApp](/method/messages.getBotApp.md)
Obtain information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps)

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [Telegram Mini Apps](/bots/webapps.md)

#### [messages.prolongWebView](/method/messages.prolongWebView.md)
Indicate to the server (from the user side) that the user is still using a web app.

If the method returns a `QUERY_ID_INVALID` error, the webview must be closed.