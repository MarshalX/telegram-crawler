# updateDeleteChannelMessages

Some messages in a [supergroup/channel](/api/channel.md) were deleted

```tl
updateDeleteChannelMessages#c32d5b12 channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel\_id** | [long](/type/long.md) | Channel ID |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of messages that were deleted |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.