# webViewResultUrl

Contains the webview URL with appropriate theme and user info parameters added

```tl
webViewResultUrl#4d22ff98 flags:# fullsize:flags.1?true fullscreen:flags.2?true query_id:flags.0?long url:string = WebViewResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **fullsize** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | If set, the app must be opened in fullsize mode instead of compact mode. |
| **fullscreen** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | If set, the app must be opened in fullscreen |
| **query\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | Webview session ID (only returned by [inline button mini apps](/api/bots/webapps.md#inline-button-mini-apps), [menu button mini apps](/api/bots/webapps.md#menu-button-mini-apps), [attachment menu mini apps](/api/bots/webapps.md#attachment-menu-mini-apps)). |
| **url** | [string](/type/string.md) | Webview URL to open |

### Type
[WebViewResult](/type/WebViewResult.md)

### Related pages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.