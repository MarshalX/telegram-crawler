# requestPeerTypeCreateBot

Used in a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) by a [manager bot](/api/bots/managed-bots.md) to ask a user to create a new [managed bot »](/api/bots/managed-bots.md), see [here »](/api/bots/buttons.md#requesting-a-managed-bot) for more info.

```tl
requestPeerTypeCreateBot#3e81e078 flags:# bot_managed:flags.0?true suggested_name:flags.1?string suggested_username:flags.2?string = RequestPeerType;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **bot\_managed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, requests to create a managed bot; must always be set. |
| **suggested\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | If set, the name to pre-fill in the managed bot creation flow |
| **suggested\_username** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If set, the username to pre-fill in the managed bot creation flow |

### Type
[RequestPeerType](/type/RequestPeerType.md)

### Related pages

#### [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)

Available only in private chats, in [reply keyboards](/constructor/replyKeyboardMarkup.md).

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.

#### [Managed bots](/api/bots/managed-bots.md)
Users can create **managed** bots (which are controlled by a specific manager bot) directly through the MTProto API, without interacting with [@BotFather](https://t.me/botfather).

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.