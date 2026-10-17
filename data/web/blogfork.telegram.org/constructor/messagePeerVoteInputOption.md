# messagePeerVoteInputOption

How a peer voted in a poll (reduced constructor, returned if an `option` was provided to [messages.getPollVotes](/method/messages.getPollVotes.md))

```tl
messagePeerVoteInputOption#74cda504 peer:Peer date:int = MessagePeerVote;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | The peer that voted for the queried `option` |
| **date** | [int](/type/int.md) | When did the peer cast the vote |

### Type
[MessagePeerVote](/type/MessagePeerVote.md)

### Related pages

#### [messages.getPollVotes](/method/messages.getPollVotes.md)
Get poll results for non-anonymous polls