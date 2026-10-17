# messages.setBotCallbackAnswer

Set the callback answer to a user button press (bots only)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setBotCallbackAnswer#d58f130a flags:# alert:flags.1?true query_id:long message:flags.0?string url:flags.2?string cache_time:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **alert** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether to show the message as a popup instead of a toast notification |
| **query\_id** | [long](/type/long.md) | Query ID |
| **message** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Popup to show |
| **url** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | URL to open |
| **cache\_time** | [int](/type/int.md) | Cache validity |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MESSAGE\_TOO\_LONG | The provided message is too long. |
| 400 | QUERY\_ID\_INVALID | The query ID is invalid. |
| 400 | URL\_INVALID | Invalid URL provided. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |