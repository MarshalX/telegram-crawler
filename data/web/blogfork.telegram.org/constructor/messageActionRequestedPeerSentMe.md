# messageActionRequestedPeerSentMe

Contains info about one or more peers that the a user shared with the me (the bot) after clicking on a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button (service message received by the bot).

```tl
messageActionRequestedPeerSentMe#93b31848 button_id:int peers:Vector<RequestedPeer> = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **button\_id** | [int](/type/int.md) | `button_id` contained in the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) |
| **peers** | [Vector](/type/Vector%20t)&lt;[RequestedPeer](/type/RequestedPeer.md)&gt; | Info about the shared peers. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.