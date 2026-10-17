# messages.discardEncryption

Cancels a request for creation and/or delete info on secret chat.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.discardEncryption#f393aea0 flags:# delete_history:flags.0?true chat_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **delete\_history** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to delete the entire chat history for the other user as well |
| **chat\_id** | [int](/type/int.md) | Secret chat ID |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_EMPTY | The provided chat ID is empty. |
| 400 | ENCRYPTION\_ALREADY\_ACCEPTED | Secret chat already accepted. |
| 400 | ENCRYPTION\_ALREADY\_DECLINED | The secret chat was already declined. |
| 400 | ENCRYPTION\_ID\_INVALID | The provided secret chat ID is invalid. |