# keyboardButtonWebView

Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestWebView](/method/messages.requestWebView.md), sending over user information after user confirmation.

Can only be sent or received as part of an inline keyboard, use [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md) for reply keyboards.

When pressed, clients must open an [Inline Button Mini App](/api/bots/webapps.md#inline-button-mini-apps) using [messages.requestWebView](/method/messages.requestWebView.md), passing `url` to [messages.requestWebView](/method/messages.requestWebView.md).`url`.

```tl
keyboardButtonWebView#e846b1a0 flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |
| **url** | [string](/type/string.md) | [Web app url](/api/bots/webapps.md) |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.

#### [messages.requestWebView](/method/messages.requestWebView.md)
Open a [bot mini app](/bots/webapps.md), sending over user information after user confirmation.

After calling this method, until the user closes the webview, [messages.prolongWebView](/method/messages.prolongWebView.md) must be called every 60 seconds.

#### [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md)
Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), without sending user information to the web app.

Can only be sent or received as part of a reply keyboard, use [keyboardButtonWebView](/constructor/keyboardButtonWebView.md) for inline keyboards.

When pressed, clients must open a [Keyboard Button Mini App](/api/bots/webapps.md#keyboard-button-mini-apps) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), passing `url` to [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md).`url`.