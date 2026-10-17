# inputKeyboardButtonUrlAuth

Button to request a user to [authorize](/method/messages.acceptUrlAuth.md) via URL using [Seamless Telegram Login](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots).

Use this constructor to send a [keyboardButtonUrlAuth](/constructor/keyboardButtonUrlAuth.md) button in an [inline keyboard](/bots/features.md#inline-keyboards).

```tl
inputKeyboardButtonUrlAuth#68013e72 flags:# request_write_access:flags.0?true style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.1?string url:string bot:InputUser = KeyboardButton;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **request\_write\_access** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to request the permission for your bot to send messages to the user. |
| **style** | [flags](/mtproto/TL-combinators.md#conditional-fields).10?[KeyboardButtonStyle](/type/KeyboardButtonStyle.md) | Button style, see [here »](/api/bots/buttons.md#button-styles) for more info on button styles. |
| **text** | [string](/type/string.md) | Button text |
| **fwd\_text** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | New text of the button in forwarded messages. |
| **url** | [string](/type/string.md) | An HTTP URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in [Receiving authorization data](/widgets/login.md#receiving-authorization-data).\
NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in [Checking authorization](/widgets/login.md#checking-authorization). |
| **bot** | [InputUser](/type/InputUser.md) | Username of a bot, which will be used for user authorization. See [Setting up a bot](/widgets/login.md#setting-up-a-bot) for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See [Linking your domain to the bot](/widgets/login.md#linking-your-domain-to-the-bot) for more details. |

### Type
[KeyboardButton](/type/KeyboardButton.md)

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [Telegram Login Widget](/widgets/login.md)

#### [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md)
Use this to accept a Seamless Telegram Login authorization request, for more info [click here »](/api/url-authorization.md)

#### [keyboardButtonUrlAuth](/constructor/keyboardButtonUrlAuth.md)
Button to request a user to authorize via URL using [Seamless Telegram Login](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots). When the user clicks on such a button, [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) should be called, providing the `button_id` and the ID of the container message. The returned [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) object will contain more details about the authorization request (`request_write_access` if the bot would like to send messages to the user along with the username of the bot which will be used for user authorization). Finally, the user can choose to call [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) to get a [urlAuthResultAccepted](/constructor/urlAuthResultAccepted.md) with the URL to open instead of the `url` of this constructor, or a [urlAuthResultDefault](/constructor/urlAuthResultDefault.md), in which case the `url` of this constructor must be opened, instead. If the user refuses the authorization request but still wants to open the link, the `url` of this constructor must be used.

Available only in [inline keyboards](/constructor/replyInlineMarkup.md).

#### [Telegram Bot Features](/bots/features.md)
This page describes individual bot elements in greater detail. For a general overview of bots, read the introduction to bots first.