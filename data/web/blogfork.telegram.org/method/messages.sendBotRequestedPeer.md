# messages.sendBotRequestedPeer

Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

```tl
updatesTooLong#e317af7e = Updates;
updateShortMessage#313bc7f8 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int user_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShortChatMessage#4d6deea5 flags:# out:flags.1?true mentioned:flags.4?true media_unread:flags.5?true silent:flags.13?true id:int from_id:long chat_id:long message:string pts:int pts_count:int date:int fwd_from:flags.2?MessageFwdHeader via_bot_id:flags.11?long reply_to:flags.3?MessageReplyHeader entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
updateShort#78d4dec1 update:Update date:int = Updates;
updatesCombined#725b04c3 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq_start:int seq:int = Updates;
updates#74ae4240 updates:Vector<Update> users:Vector<User> chats:Vector<Chat> date:int seq:int = Updates;
updateShortSentMessage#9015e101 flags:# out:flags.1?true id:int pts:int pts_count:int date:int media:flags.9?MessageMedia entities:flags.7?Vector<MessageEntity> ttl_period:flags.25?int = Updates;
---functions---
messages.sendBotRequestedPeer#6c5cf2a7 flags:# peer:InputPeer msg_id:flags.0?int webapp_req_id:flags.1?string button_id:int requested_peers:Vector<InputPeer> = Updates;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | The bot that sent the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button. |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | ID of the message that contained the reply keyboard with the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button. |
| **webapp\_req\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If the button was prepared for a [Mini App »](/api/bots/buttons.md#requesting-peers-via-mini-apps), the Mini App request ID returned by [bots.requestWebViewButton](/method/bots.requestWebViewButton.md). |
| **button\_id** | [int](/type/int.md) | The `button_id` field from the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) constructor. |
| **requested\_peers** | [Vector](/type/Vector%20t)&lt;[InputPeer](/type/InputPeer.md)&gt; | The chosen peers. |

### Result
[Updates](/type/Updates.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.

#### [bots.requestWebViewButton](/method/bots.requestWebViewButton.md)
Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.