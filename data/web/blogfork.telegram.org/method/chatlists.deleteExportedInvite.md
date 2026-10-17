# chatlists.deleteExportedInvite

Delete a previously created [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
chatlists.deleteExportedInvite#719c5c5e chatlist:InputChatlist slug:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | The related folder |
| **slug** | [string](/type/string.md) | `slug` obtained from the [chat folder deep link »](/api/links.md#chat-folder-links). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |
| 400 | INVITE\_SLUG\_EXPIRED | The specified chat folder link has expired. |
| 400 | INVITE\_SLUG\_INVALID | The specified invitation slug is invalid. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.