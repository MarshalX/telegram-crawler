# chatParticipantAdmin

[Basic group](/api/channel.md#basic-groups) admin (not usable by supergroups).

```tl
chatParticipantAdmin#360d5d2 flags:# user_id:long inviter_id:long date:int rank:flags.0?string = ChatParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | ID of a group member that is admin |
| **inviter\_id** | [long](/type/long.md) | ID of the user that added the member to the group |
| **date** | [int](/type/int.md) | Date when the user was added |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | The participant's [tag »](/api/rank.md). |

### Type
[ChatParticipant](/type/ChatParticipant.md)

### Related pages

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.