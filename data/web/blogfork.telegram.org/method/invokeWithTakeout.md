# invokeWithTakeout

Invoke a method within a [takeout session, see here » for more info](/api/takeout.md).

```tl
---functions---
invokeWithTakeout#aca9fd2e {X:Type} takeout_id:long query:!X = X;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **takeout\_id** | [long](/type/long.md) | [Takeout session ID »](/api/takeout.md) |
| **query** | !X | Query |

### Result
Returns the type returned by the invoked method.

### Both users and bots can use this method

### Related pages

#### [Takeout API](/api/takeout.md)
Telegram's API allows users to export all of their information through the takeout API.