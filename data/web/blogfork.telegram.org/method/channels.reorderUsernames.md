# channels.reorderUsernames

Reorder active usernames

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.reorderUsernames#b45ced1d channel:InputChannel order:Vector<string> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | The supergroup or channel |
| **order** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The new order for active usernames. All active usernames must be specified. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_NOT\_MODIFIED | No changes were made to chat information because the new information you passed is identical to the current information. |