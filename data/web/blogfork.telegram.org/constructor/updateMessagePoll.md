# updateMessagePoll

The results of a poll have changed

```tl
updateMessagePoll#d64c522b flags:# peer:flags.1?Peer msg_id:flags.1?int top_msg_id:flags.2?int poll_id:long poll:flags.0?Poll results:PollResults = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Peer](/type/Peer.md) | Peer of the message containing the poll |
| **msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[int](/type/int.md) | Message ID of the poll |
| **top\_msg\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[int](/type/int.md) | If the poll is in a forum topic, the ID of the top message of the topic |
| **poll\_id** | [long](/type/long.md) | Poll ID |
| **poll** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Poll](/type/Poll.md) | If the server knows the client hasn't cached this poll yet, the poll itself |
| **results** | [PollResults](/type/PollResults.md) | New poll results |

### Type
[Update](/type/Update.md)