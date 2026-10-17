# messageActionRequestedPeer

Contains info about one or more peers that the we (the user) shared with the bot after clicking on a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button (service message sent by the user).

```tl
messageActionRequestedPeer#31518e9b button_id:int peers:Vector<Peer> = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **button\_id** | [int](/type/int.md) | `button_id` contained in the [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) |
| **peers** | [Vector](/type/Vector%20t)&lt;[Peer](/type/Peer.md)&gt; | The shared peers |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.