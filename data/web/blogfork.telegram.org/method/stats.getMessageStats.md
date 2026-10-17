# stats.getMessageStats

Get [message statistics](/api/stats.md)

```tl
stats.messageStats#7fe91c14 views_graph:StatsGraph reactions_by_emotion_graph:StatsGraph = stats.MessageStats;
---functions---
stats.getMessageStats#b6e0a3f5 flags:# dark:flags.0?true channel:InputChannel msg_id:int = stats.MessageStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to enable dark theme for graph colors |
| **channel** | [InputChannel](/type/InputChannel.md) | Channel ID |
| **msg\_id** | [int](/type/int.md) | Message ID |

### Result
[stats.MessageStats](/type/stats.MessageStats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | MESSAGE\_ID\_INVALID | The provided message id is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.