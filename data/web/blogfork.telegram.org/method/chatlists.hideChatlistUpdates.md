# chatlists.hideChatlistUpdates

Dismiss new pending peers recently added to a [chat folder deep link »](/api/links.md#chat-folder-links).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
chatlists.hideChatlistUpdates#66e486fb chatlist:InputChatlist = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **chatlist** | [InputChatlist](/type/InputChatlist.md) | The folder |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | FILTER\_ID\_INVALID | The specified filter ID is invalid. |
| 400 | FILTER\_NOT\_SUPPORTED | The specified filter cannot be used in this context. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.