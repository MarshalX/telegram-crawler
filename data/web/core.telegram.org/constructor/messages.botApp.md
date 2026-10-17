# messages.botApp

Contains information about a [direct link Mini App](/api/bots/webapps.md#direct-link-mini-apps)

```tl
messages.botApp#eb50adf5 flags:# inactive:flags.0?true request_write_access:flags.1?true has_settings:flags.2?true app:BotApp = messages.BotApp;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **inactive** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the web app was never used by the user, and confirmation must be asked from the user before opening it. |
| **request\_write\_access** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | The bot is asking permission to send messages to the user: if the user agrees, set the `write_allowed` flag when invoking [messages.requestAppWebView](/method/messages.requestAppWebView.md). |
| **has\_settings** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Deprecated flag, can be ignored. |
| **app** | [BotApp](/type/BotApp.md) | Bot app information |

### Type
[messages.BotApp](/type/messages.BotApp.md)

### Related pages

#### [messages.requestAppWebView](/method/messages.requestAppWebView.md)
Open a [bot mini app](/bots/webapps.md) from a [direct Mini App deep link](/api/links.md#direct-mini-app-links), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.