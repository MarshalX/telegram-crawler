# keyboardButtonUrlAuth

Button to request a user to authorize via URL using [Seamless Telegram Login](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots). When the user clicks on such a button, [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) should be called, providing the `button_id` and the ID of the container message. The returned [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) object will contain more details about the authorization request (`request_write_access` if the bot would like to send messages to the user along with the username of the bot which will be used for user authorization). Finally, the user can choose to call [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) to get a [urlAuthResultAccepted](/constructor/urlAuthResultAccepted.md) with the URL to open instead of the `url` of this constructor, or a [urlAuthResultDefault](/constructor/urlAuthResultDefault.md), in which case the `url` of this constructor must be opened, instead. If the user refuses the authorization request but still wants to open the link, the `url` of this constructor must be used.

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

```tl
keyboardButtonUrlAuth#f51006f9 flags:# style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.0?string url:string button_id:int = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button label |
| **fwd\_text** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | New text of the button in forwarded messages. |
| **url** | [string](/type/string.md) | An HTTP URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in [Receiving authorization data](/widgets/login.md#receiving-authorization-data).\
\
**NOTE**: Services must **always** check the hash of the received data to verify the authentication and the integrity of the data as described in [Checking authorization](/widgets/login.md#checking-authorization). |
| **button\_id** | [int](/type/int.md) | ID of the button to pass to [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [Telegram Login Widget](/widgets/login.md)

#### [messages.requestUrlAuth](/method/messages.requestUrlAuth.md)
Get more info about a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [urlAuthResultRequest](/constructor/urlAuthResultRequest.md)
Details about the authorization request, for more info [click here »](/api/url-authorization.md)

#### [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md)
Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [urlAuthResultAccepted](/constructor/urlAuthResultAccepted.md)
Details about an accepted authorization request, for more info [click here »](/api/url-authorization.md)

#### [urlAuthResultDefault](/constructor/urlAuthResultDefault.md)
Details about an accepted authorization request, for more info [click here »](/api/url-authorization.md)

#### [replyInlineMarkup](/constructor/replyInlineMarkup.md)
Represents an inline keyboard