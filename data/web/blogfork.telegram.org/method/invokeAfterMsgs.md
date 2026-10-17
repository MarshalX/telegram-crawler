# invokeAfterMsgs

Invokes a query after a successful completion of previous queries

```tl
---functions---
invokeAfterMsgs#3dc4b4f0 {X:Type} msg_ids:Vector<long> query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **msg\_ids** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | List of messages on which a current query depends |
| **query** | !X | The query itself |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method