# updateChannelAvailableMessages

The history of a [channel/supergroup](/api/channel.md) was hidden.

```tl
updateChannelAvailableMessages#b23fc698 channel_id:long available_min_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | Channel/supergroup ID |
| **available\_min\_id** | [int](/type/int.md) | Identifier of a maximum unavailable message in a channel due to hidden history. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.