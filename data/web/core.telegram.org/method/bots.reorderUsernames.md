# bots.reorderUsernames

Reorder usernames associated to a bot we own.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.reorderUsernames#9709b1c2 bot:InputUser order:Vector<string> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **bot** | [InputUser](/type/InputUser.md) | The bot |
| **order** | [Vector](/type/Vector%20t)&lt;[string](/type/string.md)&gt; | The new order for active usernames. All active usernames must be specified. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | USERNAME\_NOT\_MODIFIED | The username was not modified. |