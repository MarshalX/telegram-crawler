# messages.affectedFoundMessages

Messages found and affected by changes

```tl
messages.affectedFoundMessages#ef8d3e6c pts:int pts_count:int offset:int messages:Vector<int> = messages.AffectedFoundMessages;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **pts** | [int](/type/int.md) | [Event count after generation](/api/updates.md) |
| **pts\_count** | [int](/type/int.md) | [Number of events that were generated](/api/updates.md) |
| **offset** | [int](/type/int.md) | If bigger than zero, the request must be repeated to remove more messages |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Affected message IDs |

### Type
[messages.AffectedFoundMessages](/type/messages.AffectedFoundMessages.md)

### Related pages

#### [Working with Updates](/api/updates.md)
How to subscribe to updates and handle them properly.