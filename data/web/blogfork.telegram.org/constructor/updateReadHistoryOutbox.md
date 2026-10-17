# updateReadHistoryOutbox

Outgoing messages were read

```tl
updateReadHistoryOutbox#2f2f21bf peer:Peer max_id:int pts:int pts_count:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [Peer](/type/Peer.md) | Peer |
| **max\_id** | [int](/type/int.md) | Maximum ID of read outgoing messages |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |

### Type
[Update](/type/Update.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.