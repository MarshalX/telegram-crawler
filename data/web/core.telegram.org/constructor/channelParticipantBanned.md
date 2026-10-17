# channelParticipantBanned

Banned/kicked user

```tl
channelParticipantBanned#d5f0ad91 flags:# left:flags.0?true peer:Peer kicked_by:long date:int banned_rights:ChatBannedRights rank:flags.2?string = ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **left** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the user has left the group |
| **peer** | [Peer](/type/Peer.md) | The banned peer |
| **kicked\_by** | [long](/type/long.md) | User was kicked by the specified admin |
| **date** | [int](/type/int.md) | When did the user join the group |
| **banned\_rights** | [ChatBannedRights](/type/ChatBannedRights.md) | Banned [rights](/api/rights.md) |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The participant's [tag »](/api/rank.md). |

### Type
[ChannelParticipant](/type/ChannelParticipant.md)

### Related pages

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.