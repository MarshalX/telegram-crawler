# messages.sendWebViewData

Used by the user to relay data from an opened [reply keyboard bot mini app](/api/bots/webapps.md) to the bot that owns it.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendWebViewData#dc0242c8 bot:InputUser random_id:long button_text:string data:string = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | Bot that owns the web app |
| **random\_id** | [long](/type/long.md) | Unique client message ID to prevent duplicate sending of the same event. See [here »](/api/updates.md#updatemessageid-updates) for more info on random ID deduplication and updateMessageID mapping. |
| **button\_text** | [string](/type/string.md) | Text of the [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md) that was pressed to open the web app. |
| **data** | [string](/type/string.md) | Data to relay to the bot, obtained from a [`web_app_data_send` JS event](/api/web-events.md#web-app-data-send). |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [keyboardButtonSimpleWebView](/constructor/keyboardButtonSimpleWebView.md)
Button to open a [bot mini app](/api/bots/webapps.md) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), without sending user information to the web app.

Can only be sent or received as part of a reply keyboard, use [keyboardButtonWebView](/constructor/keyboardButtonWebView.md) for inline keyboards.

When pressed, clients must open a [Keyboard Button Mini App](/api/bots/webapps.md#keyboard-button-mini-apps) using [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md), passing `url` to [messages.requestSimpleWebView](/method/messages.requestSimpleWebView.md).`url`.

#### [Web events](/api/web-events.md)
How telegram apps interact with webpages

#### [Mini Apps on Telegram](/api/bots/webapps.md)
Bots can offer users interactive HTML5 web apps to completely replace any website.