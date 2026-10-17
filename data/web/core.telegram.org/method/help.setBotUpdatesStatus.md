# help.setBotUpdatesStatus

Informs the server about the number of pending bot updates if they haven't been processed for a long time; for bots only

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
help.setBotUpdatesStatus#ec22cfcd pending_updates_count:int message:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **pending\_updates\_count** | [int](/type/int.md) | Number of pending updates |
| **message** | [string](/type/string.md) | Error message, if present |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |