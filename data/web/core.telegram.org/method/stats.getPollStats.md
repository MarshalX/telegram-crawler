# stats.getPollStats

Get [statistics](/api/stats.md#poll-statistics) for a poll sent in a message.

```tl
stats.pollStats#2999beed votes_graph:StatsGraph = stats.PollStats;
---functions---
stats.getPollStats#c27dfa68 flags:# dark:flags.0?true peer:InputPeer msg_id:int = stats.PollStats;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **dark** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to enable dark theme for graph colors |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer where the poll was sent |
| **msg\_id** | [int](/type/int.md) | ID of the message containing the poll |

### Result
[stats.PollStats](/type/stats.PollStats.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Channel statistics](/api/stats.md)
Telegram offers detailed channel statistics for channels and supergroups.