# messageActionManagedBotCreated

Service message sent by a user to a manager bot when a new [managed bot »](/api/bots/managed-bots.md) is created through it, by invoking [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md) with a [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md), see [here »](/api/bots/buttons.md#requesting-a-managed-bot) for more info.

```tl
messageActionManagedBotCreated#16605e3e bot_id:long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot\_id** | [long](/type/long.md) | ID of the newly created managed bot |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

#### [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)
Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

#### [requestPeerTypeCreateBot](/constructor/requestPeerTypeCreateBot.md)
Used in a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) by a [manager bot](/api/bots/managed-bots.md) to ask a user to create a new [managed bot »](/api/bots/managed-bots.md), see [here »](/api/bots/buttons.md#requesting-a-managed-bot) for more info.

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.