# updateReadChannelDiscussionInbox

Incoming comments in a [discussion thread](/api/threads.md) were marked as read

```tl
updateReadChannelDiscussionInbox#d6b19546 flags:# channel_id:long top_msg_id:int read_max_id:int broadcast_id:flags.0?long broadcast_post:flags.0?int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **channel\_id** | [long](/type/long.md) | [Discussion group ID](/api/channel.md) |
| **top\_msg\_id** | [int](/type/int.md) | ID of the group message that started the [thread](/api/threads.md) (message in linked discussion group) |
| **read\_max\_id** | [int](/type/int.md) | Message ID of latest read incoming message for this [thread](/api/threads.md) |
| **broadcast\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[long](/type/long.md) | If set, contains the ID of the [channel](/api/channel.md) that contains the post that started the [comment thread](/api/threads.md) in the discussion group (`channel_id`) |
| **broadcast\_post** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[int](/type/int.md) | If set, contains the ID of the channel post that started the [comment thread](/api/threads.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.