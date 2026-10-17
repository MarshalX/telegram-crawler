# messages.VotesList

How users voted in a poll

```tl
messages.votesList#4899484e flags:# count:int votes:Vector<MessagePeerVote> chats:Vector<Chat> users:Vector<User> next_offset:flags.0?string = messages.VotesList;

---functions---

messages.getPollVotes#b86e380e flags:# peer:InputPeer id:int option:flags.0?bytes offset:flags.1?string limit:int = messages.VotesList;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.votesList](/constructor/messages.votesList.md) | How users voted in a poll |

### Methods

| Method | Description |
| --- | --- |
| [messages.getPollVotes](/method/messages.getPollVotes.md) | Get poll results for non-anonymous polls |