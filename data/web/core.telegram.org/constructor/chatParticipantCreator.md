# chatParticipantCreator

Represents the creator of the [basic group »](/api/channel.md#basic-groups)

```tl
chatParticipantCreator#e1f867b8 flags:# user_id:long rank:flags.0?string = ChatParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | ID of the user that created the group |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | The participant's [tag »](/api/rank.md). |

### Type
[ChatParticipant](/type/ChatParticipant.md)

### Related pages

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.