# messageActionPaidMessagesPrice

The price of [paid messages »](/api/paid-messages.md) in this chat was changed.

```tl
messageActionPaidMessagesPrice#84b88578 flags:# broadcast_messages_allowed:flags.0?true stars:long = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **broadcast\_messages\_allowed** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Can only be set for channels, if set indicates that [direct messages were enabled »](/api/monoforum.md), otherwise indicates that direct messages were disabled; the price of paid messages is related to the price of direct messages (aka those sent to the associated [monoforum](/api/monoforum.md)). |
| **stars** | [long](/type/long.md) | The new price in [Telegram Stars](/api/stars.md), can be `0` if messages are now free. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.

#### [Telegram Stars](/api/stars.md)
Telegram Stars are virtual items that allow users to purchase digital goods and services from bots and mini apps inside the Telegram ecosystem, send gifts to content creators on the Telegram platform, and more.

#### [Paid messages](/api/paid-messages.md)
Telegram Stars can be used to pay for sending messages to users, supergroups and channels that have configured paid messages, requiring a payment for every message sent to them.