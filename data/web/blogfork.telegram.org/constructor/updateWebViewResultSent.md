# updateWebViewResultSent

Indicates to a bot that a webview was closed and an inline message was sent on behalf of the user using [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md)

```tl
updateWebViewResultSent#1592b79d query_id:long = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query\_id** | [long](/type/long.md) | Web app interaction ID |

### Type
[Update](/type/Update.md)

### Related pages

#### [messages.sendWebViewResultMessage](/method/messages.sendWebViewResultMessage.md)
Terminate webview interaction started with [messages.requestWebView](/method/messages.requestWebView.md), sending the specified message to the chat on behalf of the user.