# updateChannelParticipant

A participant has left, joined, was banned or admined in a [channel or supergroup](/api/channel.md).

```tl
updateChannelParticipant#985d3abb flags:# via_chatlist:flags.3?true channel_id:long date:int actor_id:long user_id:long prev_participant:flags.0?ChannelParticipant new_participant:flags.1?ChannelParticipant invite:flags.2?ExportedChatInvite qts:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_chatlist** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | Whether the participant joined using a [chat folder deep link »](/api/links.md#chat-folder-links). |
| **channel\_id** | [long](/type/long.md) | Channel ID |
| **date** | [int](/type/int.md) | Date of the event |
| **actor\_id** | [long](/type/long.md) | User that triggered the change (inviter, admin that kicked the user, or the even the **user\_id** itself) |
| **user\_id** | [long](/type/long.md) | User that was affected by the change |
| **prev\_participant** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[ChannelParticipant](/type/ChannelParticipant.md) | Previous participant status |
| **new\_participant** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[ChannelParticipant](/type/ChannelParticipant.md) | New participant status |
| **invite** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[ExportedChatInvite](/type/ExportedChatInvite.md) | Chat invite used to join the [channel/supergroup](/api/channel.md) |
| **qts** | [int](/type/int.md) | New **qts** value, see [updates »](/api/updates.md) for more info. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.