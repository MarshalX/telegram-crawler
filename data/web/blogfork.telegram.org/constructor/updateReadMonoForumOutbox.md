# updateReadMonoForumOutbox

Outgoing messages in a [monoforum](/api/monoforum.md) were read.

```tl
updateReadMonoForumOutbox#a4a79376 channel_id:long saved_peer_id:Peer read_max_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | ID of the monoforum. |
| **saved\_peer\_id** | [Peer](/type/Peer.md) | Topic ID. |
| **read\_max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.