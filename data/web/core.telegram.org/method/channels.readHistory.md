# channels.readHistory

Mark [channel/supergroup](/api/channel.md) history as read

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.readHistory#cc104937 channel:InputChannel max_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | [Channel/supergroup](/api/channel.md) |
| **max\_id** | [int](/type/int.md) | ID of message up to which messages should be marked as read |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 406 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.