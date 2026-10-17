# updateReadChannelDiscussionOutbox

Outgoing comments in a [discussion thread](/api/threads.md) were marked as read

```tl
updateReadChannelDiscussionOutbox#695c9e7c channel_id:long top_msg_id:int read_max_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | [Supergroup ID](/api/channel.md) |
| **top\_msg\_id** | [int](/type/int.md) | ID of the group message that started the [thread](/api/threads.md) |
| **read\_max\_id** | [int](/type/int.md) | Message ID of latest read outgoing message for this [thread](/api/threads.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.