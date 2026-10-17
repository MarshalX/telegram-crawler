# messages.votesList

How users voted in a poll

```tl
messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **count** | [int](/type/int.md) | Total number of votes for all options (or only for the chosen `option`, if provided to [messages.getPollVotes](/method/messages.getPollVotes.md)) |
| **votes** | [Vector](/type/Vector%20t)&lt;[MessagePeerVote](/type/MessagePeerVote.md)&gt; | Vote info for each user |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Info about users that voted in the poll |
| **next\_offset** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Offset to use with the next [messages.getPollVotes](/method/messages.getPollVotes.md) request, empty string if no more results are available. |

### Type
[messages.VotesList](/type/messages.VotesList.md)

### Related pages

#### [messages.getPollVotes](/method/messages.getPollVotes.md)
Get poll results for non-anonymous polls