# messages.getPollVotes

Get poll results for non-anonymous polls

```tl
messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList;
---functions---
messages.getPollVotes#b86e380e flags:# peer:InputPeer id:int option:flags.0?bytes offset:flags.1?string limit:int = messages.VotesList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Chat where the poll was sent |
| **id** | [int](/type/int.md) | Message ID |
| **option** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[bytes](/type/bytes.md) | Get only results for the specified poll `option` |
| **offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Offset for results, taken from the `next_offset` field of [messages.votesList](/constructor/messages.votesList.md), initially an empty string. \
Note: if no more results are available, the method call will return an empty `next_offset`; thus, avoid providing the `next_offset` returned in [messages.votesList](/constructor/messages.votesList.md) if it is empty, to avoid an infinite loop. |
| **limit** | [int](/type/int.md) | Number of results to return |

### Result
[messages.VotesList](/type/messages.VotesList.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | BROADCAST\_FORBIDDEN | Channel poll voters and reactions cannot be fetched to prevent deanonymization. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 403 | POLL\_VOTE\_REQUIRED | Cast a vote in the poll before calling this method. |

### Related pages

#### [messages.votesList](/constructor/messages.votesList.md)
How users voted in a poll