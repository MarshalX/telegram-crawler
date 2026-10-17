# requestedPeerUser

Info about a user, shared by a user with the currently logged in bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

All fields except the ID are optional, and will be populated if present on the chosen user, according to the parameters of the requesting [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md).

```tl
requestedPeerUser#d62ff46a flags:# user_id:long first_name:flags.0?string last_name:flags.0?string username:flags.1?string photo:flags.2?Photo = RequestedPeer;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | User ID. |
| **first\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | First name. |
| **last\_name** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Last name. |
| **username** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Username. |
| **photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Photo](/type/Photo.md) | Profile photo. |

### Type
[RequestedPeer](/type/RequestedPeer.md)

### Related pages

#### [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md)
Send one or more chosen peers, as requested by a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button.

#### [inputKeyboardButtonRequestPeer](/constructor/inputKeyboardButtonRequestPeer.md)
Prompts the user to select and share one or more peers with the bot using [messages.sendBotRequestedPeer](/method/messages.sendBotRequestedPeer.md).

Use this constructor to send a [keyboardButtonRequestPeer](/constructor/keyboardButtonRequestPeer.md) button in a [reply keyboard](/bots/features.md#keyboards) in a private chat.

See [peer requests](/api/bots/buttons.md#peer-requests) for the full flow.