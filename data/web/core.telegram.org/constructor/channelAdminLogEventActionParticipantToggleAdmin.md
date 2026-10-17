# channelAdminLogEventActionParticipantToggleAdmin

The admin [rights](/api/rights.md) of a user were changed

```tl
channelAdminLogEventActionParticipantToggleAdmin#d5676710 prev_participant:ChannelParticipant new_participant:ChannelParticipant = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | Previous admin rights |
| **new\_participant** | [ChannelParticipant](/type/ChannelParticipant.md) | New admin rights |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [Admin, banned, default rights](/api/rights.md)
How to handle admin permissions, granular bans and global permissions in channels, groups and supergroups.