# chatParticipantsForbidden

The full list of members of [basic groups »](/api/channel.md#basic-groups) is not available to you, because you were banned.

```tl
chatParticipantsForbidden#8763d3e1 flags:# chat_id:long self_participant:flags.0?ChatParticipant = ChatParticipants;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chat\_id** | [long](/type/long.md) | Group ID |
| **self\_participant** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ChatParticipant](/type/ChatParticipant.md) | Info about the group membership of the current user |

### Type
[ChatParticipants](/type/ChatParticipants.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.