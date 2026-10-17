# messages.prolongWebView

Indicate to the server (from the user side) that the user is still using a web app.

If the method returns a `QUERY_ID_INVALID` error, the webview must be closed.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.prolongWebView#b0d81a83 flags:# silent:flags.5?true peer:InputPeer bot:InputUser query_id:long reply_to:flags.0?InputReplyTo send_as:flags.13?InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **silent** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the inline message that will be sent by the bot on behalf of the user once the web app interaction is [terminated](/method/messages.sendWebViewResultMessage.md) should be sent silently (no notifications for the receivers). |
| **peer** | [InputPeer](/type/InputPeer.md) | Dialog where the web app was opened. |
| **bot** | [InputUser](/type/InputUser.md) | Bot that owns the [web app](/api/bots/webapps.md) |
| **query\_id** | [long](/type/long.md) | Web app interaction ID obtained from [messages.requestWebView](/method/messages.requestWebView.md) |
| **reply\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputReplyTo](/type/InputReplyTo.md) | If set, indicates that the inline message that will be sent by the bot on behalf of the user once the web app interaction is [terminated](/method/messages.sendWebViewResultMessage.md) should be sent in reply to the specified message or story. |
| **send\_as** | [flags](/mtproto/TL-combinators.md#conditional-fields).13?[InputPeer](/type/InputPeer.md) | Open the web app as the specified peer |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md)
Terminate webview interaction started with [messages.requestWebView](/method/messages.requestWebView.md), sending the specified message to the chat on behalf of the user.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [messages.requestWebView](/method/messages.requestWebView.md)
Open a [bot mini app](/bots/webapps.md), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.