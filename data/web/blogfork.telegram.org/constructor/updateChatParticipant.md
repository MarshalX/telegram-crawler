# updateChatParticipant

A user has joined or left a specific [basic group »](/api/channel.md#basic-groups): this update can only be received by bots, see [here »](/api/peers.md#basic-group-updates) for the user version of this update.

```tl
updateChatParticipant#d087663a flags:# chat_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChatParticipant new_participant:flags.1?ChatParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **chat\_id** | [long](/type/long.md) | [Chat](/api/channel.md) ID |
| **date** | [int](/type/int.md) | When did this event occur |
| **actor\_id** | [long](/type/long.md) | User that triggered the change (inviter, admin that kicked the user, or the even the **user\_id** itself) |
| **user\_id** | [long](/type/long.md) | User that was affected by the change |
| **prev\_participant** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ChatParticipant](/type/ChatParticipant.md) | Previous participant info (empty if this participant just joined) |
| **new\_participant** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ChatParticipant](/type/ChatParticipant.md) | New participant info (empty if this participant just left) |
| **invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ExportedChatInvite](/type/ExportedChatInvite.md) | The invite that was used to join the group |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Peer database](/api/peers.md)
Many constructors in the API need to be stored in a local database upon reception and should only ever be updated reactively (passively) when received via updates or by other means (as specified in the documentation), to avoid overloading the server by continuously requesting changes for the same unchanged information.