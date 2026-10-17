# chat

Info about a group.

When updating the [local peer database](/api/peers.md), all fields from the newly received constructor take priority over the old constructor cached locally (including by removing fields that aren't set in the new constructor).

See [here »](https://github.com/tdlib/td/blob/077f71addad9db5d1a5692cc1255438793e75636/td/telegram/ChatManager.cpp#L5679) for an implementation of the logic to use when updating the [local chat peer database](/api/peers.md).

```tl
chat#41cbf256 flags:# creator:flags.0?true left:flags.2?true deactivated:flags.5?true call_active:flags.23?true call_not_empty:flags.24?true noforwards:flags.25?true id:long title:string photo:ChatPhoto participants_count:int date:int version:int migrated_to:flags.6?InputChannel admin_rights:flags.14?ChatAdminRights default_banned_rights:flags.18?ChatBannedRights = Chat;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **creator** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the current user is the creator of the group |
| **left** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether the current user has left the group |
| **deactivated** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | Whether the group was [migrated](/api/channel.md) |
| **call\_active** | [flags](/mtproto/TL-combinators.md#conditional-fields).23?[true](/constructor/true.md) | Whether a group call is currently active |
| **call\_not\_empty** | [flags](/mtproto/TL-combinators.md#conditional-fields).24?[true](/constructor/true.md) | Whether there's anyone in the group call |
| **noforwards** | [flags](/mtproto/TL-combinators.md#conditional-fields).25?[true](/constructor/true.md) | Whether this group is [protected](https://telegram.org/blog/content-protection-delete-by-date-and-more), thus does not allow forwarding messages from it |
| **id** | [long](/type/long.md) | ID of the group, see [here »](/api/peers.md#peer-id) for more info and the available ID range. |
| **title** | [string](/type/string.md) | Title |
| **photo** | [ChatPhoto](/type/ChatPhoto.md) | Chat photo |
| **participants\_count** | [int](/type/int.md) | Participant count |
| **date** | [int](/type/int.md) | Date of creation of the group |
| **version** | [int](/type/int.md) | Used in basic groups to reorder updates and make sure that all of them were received. |
| **migrated\_to** | [flags](/mtproto/TL-combinators.md#conditional-fields).6?[InputChannel](/type/InputChannel.md) | Means this chat was [upgraded](/api/channel.md) to a supergroup |
| **admin\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).14?[ChatAdminRights](/type/ChatAdminRights.md) | [Admin rights](/api/rights.md) of the user in the group |
| **default\_banned\_rights** | [flags](/mtproto/TL-combinators.md#conditional-fields).18?[ChatBannedRights](/type/ChatBannedRights.md) | [Default banned rights](/api/rights.md) of all users in the group |

### Type
[Chat](/type/Chat.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.