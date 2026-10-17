# updateMessagePollVote

A specific peer has voted in a poll (this update can only be received by a bot).

```tl
updateMessagePollVote#7699f014 poll_id:long peer:Peer options:Vector<bytes> positions:Vector<int> qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **poll\_id** | [long](/type/long.md) | Poll ID |
| **peer** | [Peer](/type/Peer.md) | The peer that voted in the poll |
| **options** | [Vector](/type/Vector%20t)&lt;[bytes](/type/bytes.md)&gt; | Chosen option(s) |
| **positions** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | 0-based indices of the voted options within the `answers` vector, corresponding element-by-element to `options` |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.