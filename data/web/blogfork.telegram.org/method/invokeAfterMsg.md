# invokeAfterMsg

Invokes a query after successful completion of one of the previous queries.

```tl
---functions---
invokeAfterMsg#cb9f372d {X:Type} msg_id:long query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **msg\_id** | [long](/type/long.md) | Message identifier on which a current query depends |
| **query** | !X | The query itself |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method