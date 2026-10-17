# channelAdminLogEventActionParticipantToggleBan

The banned [rights](/api/rights.md) of a user were changed

```tl
channelAdminLogEventActionParticipantToggleBan#e6d83d7e prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | Old banned rights of user |
| **new\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | New banned rights of user |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.