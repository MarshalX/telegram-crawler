# channelAdminLogEventActionToggleSlowMode

[Slow mode setting for supergroups was changed](/method/channels.toggleSlowMode.md)

```tl
channelAdminLogEventActionToggleSlowMode#53909779 prev_value:int new_value:int = ChannelAdminLogEventAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **prev\_value** | [int](/type/int.md) | Previous slow mode value |
| **new\_value** | [int](/type/int.md) | New slow mode value |

### Type
[ChannelAdminLogEventAction](/type/ChannelAdminLogEventAction.md)

### Related pages

#### [channels.toggleSlowMode](/method/channels.toggleSlowMode.md)
Toggle supergroup slow mode: if enabled, users will only be able to send one message every `seconds` seconds