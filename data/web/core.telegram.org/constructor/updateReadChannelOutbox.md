# updateReadChannelOutbox

Outgoing messages in a [channel/supergroup](/api/channel.md) were read

```tl
updateReadChannelOutbox#b75f99a9 channel_id:long max_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | Channel/supergroup ID |
| **max\_id** | [int](/type/int.md) | Position up to which all outgoing messages are read. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.