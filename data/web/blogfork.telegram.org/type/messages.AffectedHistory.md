# messages.AffectedHistory

Object contains info on affected part of communication history with the user or in a chat.

```tl
messages.affectedHistory#b45c69d1 pts:int pts_count:int offset:int = messages.AffectedHistory;

---functions---

messages.deleteHistory#b08f922a flags:# just_clear:flags.0?true revoke:flags.1?true peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.readMentions#36e5bf4d flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
messages.unpinAllMessages#62dd747 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;
channels.deleteParticipantHistory#367544db channel:InputChannel participant:InputPeer = messages.AffectedHistory;
messages.readReactions#9ec44f93 flags:# peer:InputPeer top_msg_id:flags.0?int saved_peer_id:flags.1?InputPeer = messages.AffectedHistory;
messages.deleteSavedHistory#4dc5085f flags:# parent_peer:flags.0?InputPeer peer:InputPeer max_id:int min_date:flags.2?int max_date:flags.3?int = messages.AffectedHistory;
messages.deleteTopicHistory#d2816f10 peer:InputPeer top_msg_id:int = messages.AffectedHistory;
messages.readPollVotes#1720b4d8 flags:# peer:InputPeer top_msg_id:flags.0?int = messages.AffectedHistory;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [messages.affectedHistory](/constructor/messages.affectedHistory.md) | Affected part of communication history with the user or in a chat. |

### Methods

| Method | Description |
| --- | --- |
| [messages.deleteHistory](/method/messages.deleteHistory.md) | Deletes communication history. |
| [messages.readMentions](/method/messages.readMentions.md) | Mark mentions as read; can be used in [forums](/api/forum.md) but **cannot** be used in [monoforums](/api/monoforum.md). |
| [messages.unpinAllMessages](/method/messages.unpinAllMessages.md) | [Unpin](/api/pin.md) all pinned messages |
| [messages.readReactions](/method/messages.readReactions.md) | Mark [message reactions »](/api/reactions.md) as read |
| [messages.deleteSavedHistory](/method/messages.deleteSavedHistory.md) | Deletes messages from a [monoforum topic »](/api/monoforum.md), or deletes messages forwarded from a specific peer to [saved messages »](/api/saved-messages.md). |
| [messages.deleteTopicHistory](/method/messages.deleteTopicHistory.md) | Delete message history of a [forum topic](/api/forum.md) |
| [messages.readPollVotes](/method/messages.readPollVotes.md) | Mark all [unread poll votes »](/api/poll.md#unread-poll-votes) in a chat as read |
| [channels.deleteParticipantHistory](/method/channels.deleteParticipantHistory.md) | Delete all messages sent by a specific participant of a given supergroup |