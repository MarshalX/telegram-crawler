# messages.requestSimpleWebView

Open a [bot mini app](/api/bots/webapps.md).

```tl
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
---functions---
messages.requestSimpleWebView#413a3e73 flags:# from_switch_webview:flags.1?true from_side_menu:flags.2?true compact:flags.7?true fullscreen:flags.8?true bot:InputUser url:flags.3?string start_param:flags.4?string theme_params:flags.0?DataJSON platform:string = WebViewResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **from\_switch\_webview** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the webapp was opened by clicking on the `switch_webview` button shown on top of the inline results list returned by [messages.getInlineBotResults](/method/messages.getInlineBotResults.md). |
| **from\_side\_menu** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Set this flag if opening the Mini App from the installed [side menu entry »](/api/bots/attach.md). |
| **compact** | [flags](/mtproto/TL-combinators.md#conditional-fields).7?[true](/constructor/true.md) | Deprecated. |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).8?[true](/constructor/true.md) | Requests to open the app in fullscreen mode. |
| **bot** | [InputUser](/type/InputUser.md) | Bot that owns the mini app |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[string](/type/string.md) | Web app URL, if opening from a keyboard button or inline result |
| **start\_param** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[string](/type/string.md) | Deprecated. |
| **theme\_params** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[DataJSON](/type/DataJSON.md) | [Theme parameters »](/api/bots/webapps.md#theme-parameters) |
| **platform** | [string](/type/string.md) | Short name of the application; 0-64 English letters, digits, and underscores |

### Result
[WebViewResult](/type/WebViewResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | URL\_INVALID | Invalid URL provided. |

### Related pages

#### [messages.getInlineBotResults](/method/messages.getInlineBotResults.md)
Query an inline bot

#### [Bot attachment menu and side menu entries](/api/bots/attach.md)
Bots can install attachment menu and side menu entries, offering conveniently accessible, versatile web apps.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.