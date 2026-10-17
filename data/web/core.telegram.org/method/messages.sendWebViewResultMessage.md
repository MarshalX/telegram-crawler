# messages.sendWebViewResultMessage

Terminate webview interaction started with [messages.requestWebView](/method/messages.requestWebView.md), sending the specified message to the chat on behalf of the user.

```tl
webViewMessageSent#c94511c flags:# msg_id:flags.0?InputBotInlineMessageID = WebViewMessageSent;
---functions---
messages.sendWebViewResultMessage#a4314f5 bot_query_id:string result:InputBotInlineResult = WebViewMessageSent;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_query\_id** | [string](/type/string.md) | Webview interaction ID obtained from [messages.requestWebView](/method/messages.requestWebView.md) |
| **result** | [InputBotInlineResult](/type/InputBotInlineResult.md) | Message to send |

### Result
[WebViewMessageSent](/type/WebViewMessageSent.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | QUERY\_ID\_INVALID | The query ID is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [messages.requestWebView](/method/messages.requestWebView.md)
Open a [bot mini app](/bots/webapps.md), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.