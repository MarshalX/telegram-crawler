# channelParticipantCreator

Channel/supergroup creator

```tl
channelParticipantCreator#2fe601d3 flags:# user_id:long admin_rights:ChatAdminRights rank:flags.0?string = ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **user\_id** | [long](/type/long.md) | User ID |
| **admin\_rights** | [ChatAdminRights](/type/ChatAdminRights.md) | Creator admin rights |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | The participant's [tag »](/api/rank.md), defaults to "Owner" if not set. |

### Type
[ChannelParticipant](/type/ChannelParticipant.md)

### Related pages

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.