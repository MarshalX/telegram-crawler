# messages.reportReadMetrics

Report viewport read metrics for visible messages, indicating how long each message stayed in the chat viewport, see [here »](/api/views.md#read-metrics) for more info on the full flow.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reportReadMetrics#4067c5e6 peer:InputPeer metrics:Vector<InputMessageReadMetric> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the messages are located |
| **metrics** | [Vector](/type/Vector%20t)&lt;[InputMessageReadMetric](/type/InputMessageReadMetric.md)&gt; | List of read metrics for individual messages |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Views and read metrics](/api/views.md)
Clients should report read state, message views and music listens using a specific set of methods.