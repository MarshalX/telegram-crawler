# ChatParticipants

Contains the full list of members of [basic groups »](/api/channel.md#basic-groups); is **NOT** usable for supergroups/channels.

```tl
chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
chatParticipants#3cbc93f8 chat_id:long participants:Vector<ChatParticipant> version:int = ChatParticipants;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [chatParticipantsForbidden](/constructor/chatParticipantsForbidden.md) | The full list of members of [basic groups »](/api/channel.md#basic-groups) is not available to you, because you were banned. |
| [chatParticipants](/constructor/chatParticipants.md) | Contains the full list of members of [basic groups »](/api/channel.md#basic-groups); is **NOT** usable for supergroups/channels. |

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.