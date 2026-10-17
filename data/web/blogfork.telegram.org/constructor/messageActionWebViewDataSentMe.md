# messageActionWebViewDataSentMe

Data from an opened [reply keyboard bot mini app](/api/bots/webapps.md) was relayed to the bot that owns it (bot side service message).

```tl
messageActionWebViewDataSentMe#47dd8079 text:string data:string = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **text** | [string](/type/string.md) | Text of the [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md) that was pressed to open the web app. |
| **data** | [string](/type/string.md) | Relayed data. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md)
Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), without sending user information to the web app.

Can only be sent or received as part of a reply keyboard, use [keyboardButtonWebView](/constructor/keyboardButtonWebView.md) for inline keyboards.

When pressed, clients must open a [Keyboard Button Mini App](/api/bots/webapps.md#keyboard-button-mini-apps) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), passing `url` to [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md).`url`.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.