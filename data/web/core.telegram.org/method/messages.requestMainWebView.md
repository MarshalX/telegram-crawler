# messages.requestMainWebView

Open a [Main Mini App](/api/bots/webapps.md#main-mini-apps).

```tl
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
---functions---
messages.requestMainWebView#c9e01e7b flags:# compact:flags.7?true fullscreen:flags.8?true peer:InputPeer bot:InputUser start_param:flags.1?string theme_params:flags.0?DataJSON platform:string = WebViewResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **compact** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | If set, requests to open the mini app in compact mode (as opposed to normal or fullscreen mode). Must be set if the `mode` parameter of the [Main Mini App link](/api/links.md#main-mini-app-links) is equal to `compact`. |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | If set, requests to open the mini app in fullscreen mode (as opposed to compact or normal mode). Must be set if the `mode` parameter of the [Main Mini App link](/api/links.md#main-mini-app-links) is equal to `fullscreen`. |
| **peer** | [InputPeer](/type/InputPeer.md) | Currently open chat, may be [inputPeerEmpty](/constructor/inputPeerEmpty.md) if no chat is currently open. |
| **bot** | [InputUser](/type/InputUser.md) | Bot that owns the main mini app. |
| **start\_param** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Start parameter, if opening from a [Main Mini App link »](/api/links.md#main-mini-app-links). |
| **theme\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[DataJSON](/type/DataJSON.md) | [Theme parameters »](/api/bots/webapps.md#theme-parameters) |
| **platform** | [string](/type/string.md) | Short name of the application; 0-64 English letters, digits, and underscores |

### Result
[WebViewResult](/type/WebViewResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [inputPeerEmpty](/constructor/inputPeerEmpty.md)
An empty constructor, no user or chat is defined.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.