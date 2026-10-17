# channelAdminLogEventActionParticipantJoinByRequest

A new member was accepted to the chat by an admin

```tl
channelAdminLogEventActionParticipantJoinByRequest#afb6144a invite:ExportedChatInvite approved_by:long = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **invite** | [ExportedChatInvite](/type/ExportedChatInvite.md) | The invite link that was used to join the chat |
| **approved\_by** | [long](/type/long.md) | ID of the admin that approved the invite |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)