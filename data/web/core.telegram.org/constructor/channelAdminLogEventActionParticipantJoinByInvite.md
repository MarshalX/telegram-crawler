# channelAdminLogEventActionParticipantJoinByInvite

A user joined the [supergroup/channel](/api/channel.md) using a specific invite link

```tl
channelAdminLogEventActionParticipantJoinByInvite#fe9fc158 flags:# via_chatlist:flags.0?true invite:ExportedChatInvite = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **via\_chatlist** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | The participant joined by importing a [chat folder deep link »](/api/links.md#chat-folder-links). |
| **invite** | [ExportedChatInvite](/type/ExportedChatInvite.md) | The invite link used to join the [supergroup/channel](/api/channel.md) |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.