# messages.setDefaultHistoryTTL

Changes the default value of the Time-To-Live setting, applied to all new chats.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setDefaultHistoryTTL#9eb51445 period:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **period** | [int](/type/int.md) | The new default Time-To-Live of all messages sent in new chats, in seconds. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | TTL\_PERIOD\_INVALID | The specified TTL period is invalid. |