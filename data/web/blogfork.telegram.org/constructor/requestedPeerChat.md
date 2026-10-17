# requestedPeerChat

Info about a [chat](/api/channel.md), shared by a user with the currently logged in bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

All fields except the ID are optional, and will be populated if present on the chosen chat, according to the parameters of the requesting [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md).

```tl
requestedPeerChat#7307544f flags:# chat_id:long title:flags.0?string photo:flags.2?Photo = RequestedPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chat\_id** | [long](/type/long.md) | Chat ID. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Chat title. |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Photo](/type/Photo.md) | Chat photo. |

### Type
[RequestedPeer](/type/RequestedPeer.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)
Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

#### [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

Use this constructor to send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button in a [reply keyboard](/bots/features.md#keyboards) in a private chat.

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.