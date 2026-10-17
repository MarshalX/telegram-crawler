# updatePinnedChannelMessages

Messages were pinned/unpinned in a [channel/supergroup](/api/channel.md)

```tl
updatePinnedChannelMessages#5bb98608 flags:# pinned:flags.0?true channel_id:long messages:Vector<int> pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **pinned** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the messages were pinned or unpinned |
| **channel\_id** | [long](/type/long.md) | Channel ID |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Messages |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.

#### [Channels, supergroups, gigagroups and basic groups](/api/channel.md)
How to handle channels, supergroups, gigagroups, basic groups, and what's the difference between them.