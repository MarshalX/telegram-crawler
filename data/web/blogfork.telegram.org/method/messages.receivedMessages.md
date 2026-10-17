# messages.receivedMessages

Confirms receipt of messages by a client, cancels PUSH-notification sending.

```tl
---functions---
messages.receivedMessages#5a954c0 max_id:int = Vector<ReceivedNotifyMessage>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **max\_id** | [int](/type/int.md) | Maximum message ID available in a client. |

### Result
[Vector](/type/Vector%20t)&lt;[ReceivedNotifyMessage](/type/ReceivedNotifyMessage.md)&gt;

### Only users can use this method