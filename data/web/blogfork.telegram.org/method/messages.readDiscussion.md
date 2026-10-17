# messages.readDiscussion

Mark a [thread](/api/threads.md) as read

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.readDiscussion#f731a9f4 peer:InputPeer msg_id:int read_max_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Group ID |
| **msg\_id** | [int](/type/int.md) | ID of message that started the thread |
| **read\_max\_id** | [int](/type/int.md) | ID up to which thread messages were read |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Message threads](/api/threads.md)
Telegram allows commenting on a channel post or on a generic supergroup message, thanks to message threads.