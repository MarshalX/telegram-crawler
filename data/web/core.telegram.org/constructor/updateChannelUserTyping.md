# updateChannelUserTyping

A user is typing in a [supergroup, channel](/api/channel.md) or [message thread](/api/threads.md)

```tl
updateChannelUserTyping#8c88c923 flags:# channel_id:long top_msg_id:flags.0?int from_id:Peer action:SendMessageAction = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel\_id** | [long](/type/long.md) | Channel ID |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | [Thread ID](/api/threads.md) |
| **from\_id** | [Peer](/type/Peer.md) | The peer that is typing |
| **action** | [SendMessageAction](/type/SendMessageAction.md) | Whether the user is typing, sending a media or doing something else |

### Type
[Update](/type/Update.md)

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.