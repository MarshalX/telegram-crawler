# KeyboardButton

Bot or inline keyboard buttons

```tl
keyboardButton#7d170cff flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonUrl#d80c25ec flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonCallback#e62bc960 flags:# requires_password:flags.0?true style:flags.10?KeyboardButtonStyle text:string data:bytes = KeyboardButton;
keyboardButtonRequestPhone#417efd8f flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonRequestGeoLocation#aa40f94d flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonSwitchInline#991399fc flags:# same_peer:flags.0?true style:flags.10?KeyboardButtonStyle text:string query:string peer_types:flags.1?Vector<InlineQueryPeerType> = KeyboardButton;
keyboardButtonGame#89c590f9 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonBuy#3fa53905 flags:# style:flags.10?KeyboardButtonStyle text:string = KeyboardButton;
keyboardButtonUrlAuth#f51006f9 flags:# style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.0?string url:string button_id:int = KeyboardButton;
inputKeyboardButtonUrlAuth#68013e72 flags:# request_write_access:flags.0?true style:flags.10?KeyboardButtonStyle text:string fwd_text:flags.1?string url:string bot:InputUser = KeyboardButton;
keyboardButtonRequestPoll#7a11d782 flags:# style:flags.10?KeyboardButtonStyle quiz:flags.0?Bool text:string = KeyboardButton;
inputKeyboardButtonUserProfile#7d5e07c7 flags:# style:flags.10?KeyboardButtonStyle text:string user_id:InputUser = KeyboardButton;
keyboardButtonUserProfile#c0fd5d09 flags:# style:flags.10?KeyboardButtonStyle text:string user_id:long = KeyboardButton;
keyboardButtonWebView#e846b1a0 flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonSimpleWebView#e15c4370 flags:# style:flags.10?KeyboardButtonStyle text:string url:string = KeyboardButton;
keyboardButtonRequestPeer#5b0f15f5 flags:# style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
inputKeyboardButtonRequestPeer#2b78156 flags:# name_requested:flags.0?true username_requested:flags.1?true photo_requested:flags.2?true style:flags.10?KeyboardButtonStyle text:string button_id:int peer_type:RequestPeerType max_quantity:int = KeyboardButton;
keyboardButtonCopy#bcc4af10 flags:# style:flags.10?KeyboardButtonStyle text:string copy_text:string = KeyboardButton;

---functions---

bots.getRequestedWebViewButton#bf25b7f3 bot:InputUser webapp_req_id:string = KeyboardButton;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [keyboardButton](/constructor/keyboardButton.md) | Bot keyboard button\
\
Available only in [reply keyboards](/constructor/replyKeyboardMarkup.md).\
\
When pressed, clients must send `text` as a message to the current chat, replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md). |
| [keyboardButtonUrl](/constructor/keyboardButtonUrl.md) | URL button\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients open `url`, showing a confirmation prompt unless the URL is one of the [internal URIs](https://github.com/DrKLO/Telegram/blob/68d51749c4fcbaffa584829f23936565df55e08b/TMessagesProj/src/main/java/org/telegram/messenger/browser/Browser.java#L680). |
| [keyboardButtonCallback](/constructor/keyboardButtonCallback.md) | Callback button\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients send `data` to the bot, optionally providing the user's [2FA SRP parameters](/api/srp.md) for identity verification, as described in [callback queries](/api/bots/buttons.md#callback-queries). |
| [keyboardButtonRequestPhone](/constructor/keyboardButtonRequestPhone.md) | Button to request a user's phone number\
\
Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).\
\
When pressed, clients must request permission from the user to send the current user's contact to the chat, replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md). |
| [keyboardButtonRequestGeoLocation](/constructor/keyboardButtonRequestGeoLocation.md) | Button to request a user's geolocation\
\
Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).\
\
When pressed, clients must request permission from the user to send the current user's geolocation to the chat, replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md). |
| [keyboardButtonSwitchInline](/constructor/keyboardButtonSwitchInline.md) | Button to switch the user to inline mode\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients must insert the bot's username and `query` into the chat input field, triggering an [inline query](/api/bots/inline.md).\
\
If `same_peer` is set, clients use the current chat. Otherwise, clients prompt the user to select a chat, filtered by `peer_types` if specified. |
| [keyboardButtonGame](/constructor/keyboardButtonGame.md) | Button to start a game\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients must open the [game](/constructor/game.md) from the attached [messageMediaGame](/constructor/messageMediaGame.md) constructor by invoking [messages.getBotCallbackAnswer](/method/messages.getBotCallbackAnswer.md) with the `game` flag set, as described in [Starting a game](/api/bots/games.md#starting-a-game). |
| [keyboardButtonBuy](/constructor/keyboardButtonBuy.md) | Button to buy a product\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients must start the [payment flow for the attached invoice](/api/payments.md). |
| [keyboardButtonUrlAuth](/constructor/keyboardButtonUrlAuth.md) | Button to request a user to authorize via URL using [Seamless Telegram Login](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots). When the user clicks on such a button, [messages.requestUrlAuth](/method/messages.requestUrlAuth.md) should be called, providing the `button_id` and the ID of the container message. The returned [urlAuthResultRequest](/constructor/urlAuthResultRequest.md) object will contain more details about the authorization request (`request_write_access` if the bot would like to send messages to the user along with the username of the bot which will be used for user authorization). Finally, the user can choose to call [messages.acceptUrlAuth](/method/messages.acceptUrlAuth.md) to get a [urlAuthResultAccepted](/constructor/urlAuthResultAccepted.md) with the URL to open instead of the `url` of this constructor, or a [urlAuthResultDefault](/constructor/urlAuthResultDefault.md), in which case the `url` of this constructor must be opened, instead. If the user refuses the authorization request but still wants to open the link, the `url` of this constructor must be used.\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md). |
| [inputKeyboardButtonUrlAuth](/constructor/inputKeyboardButtonUrlAuth.md) | Button to request a user to [authorize](/method/messages.acceptUrlAuth.md) via URL using [Seamless Telegram Login](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots).\
\
Use this constructor to send a [keyboardButtonUrlAuth](/constructor/keyboardButtonUrlAuth.md) button in an [inline keyboard](/bots/features.md#inline-keyboards). |
| [keyboardButtonRequestPoll](/constructor/keyboardButtonRequestPoll.md) | Button to request a poll from the user\
\
Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).\
\
When pressed, clients prompt the user to create and send a [poll](/api/poll.md), replying to the message that attached the [replyKeyboardMarkup](/constructor/replyKeyboardMarkup.md). If `quiz` is set, the prompt must create a quiz poll. |
| [inputKeyboardButtonUserProfile](/constructor/inputKeyboardButtonUserProfile.md) | Button that links directly to a user profile\
\
Use this constructor to send a [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md) button in an [inline keyboard](/bots/features.md#inline-keyboards). |
| [keyboardButtonUserProfile](/constructor/keyboardButtonUserProfile.md) | Button that links directly to a user profile\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients must open the profile of the user identified by `user_id`. |
| [keyboardButtonWebView](/constructor/keyboardButtonWebView.md) | Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestWebView](/method/messages.requestWebView.md), sending over user information after user confirmation.\
\
Can only be sent or received as part of an inline keyboard, use [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md) for reply keyboards.\
\
When pressed, clients must open an [Inline Button Mini App](/api/bots/webapps.md#inline-button-mini-apps) using [messages.requestWebView](/method/messages.requestWebView.md), passing `url` to [messages.requestWebView](/method/messages.requestWebView.md).`url`. |
| [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md) | Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), without sending user information to the web app.\
\
Can only be sent or received as part of a reply keyboard, use [keyboardButtonWebView](/constructor/keyboardButtonWebView.md) for inline keyboards.\
\
When pressed, clients must open a [Keyboard Button Mini App](/api/bots/webapps.md#keyboard-button-mini-apps) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), passing `url` to [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md).`url`. |
| [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) | Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)\
\
Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).\
\
See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow. |
| [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md) | Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).\
\
Use this constructor to send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button in a [reply keyboard](/bots/features.md#keyboards) in a private chat.\
\
See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow. |
| [keyboardButtonCopy](/constructor/keyboardButtonCopy.md) | Clipboard button\
\
Available only in [inline keyboards](/constructor/replyInlineMarkup.md).\
\
When pressed, clients must copy `copy_text` to the clipboard. |

### Methods

| Method | Description |
| --- | --- |
| [bots.getRequestedWebViewButton](/method/bots.getRequestedWebViewButton.md) | Fetch the peer request button a bot prepared for a [Mini App](/api/bots/webapps.md) with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), invoked when the Mini App emits a [`web_app_request_chat`](/api/web-events.md#web-app-request-chat) event, see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info. |