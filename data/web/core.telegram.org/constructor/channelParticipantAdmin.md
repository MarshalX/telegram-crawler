# channelParticipantAdmin

Admin

```tl
channelParticipantAdmin#34c3bb53 flags:# can_edit:flags.0?true self:flags.1?true user_id:long inviter_id:flags.1?long promoted_by:long date:int admin_rights:ChatAdminRights rank:flags.2?string = ChannelParticipant;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **can\_edit** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Can this admin promote other admins with the same permissions? |
| **self** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Is this the current user |
| **user\_id** | [long](/type/long.md) | Admin user ID |
| **inviter\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | User that invited the admin to the channel/group |
| **promoted\_by** | [long](/type/long.md) | User that promoted the user to admin |
| **date** | [int](/type/int.md) | When did the user join |
| **admin\_rights** | [ChatAdminRights](/type/ChatAdminRights.md) | Admin [rights](/api/rights.md) |
| **rank** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | The participant's [tag »](/api/rank.md), defaults to "Admin" if not set. |

### Type
[ChannelParticipant](/type/ChannelParticipant.md)

### Related pages

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.

#### [Group participant tags](/api/rank.md)
Members in group chats (both basic groups and supergroups) can add a tag next to their name — to show their role at work, what they study in school, and more.