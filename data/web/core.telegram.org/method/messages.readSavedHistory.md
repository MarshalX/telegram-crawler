# messages.readSavedHistory

Mark messages as read in a [monoforum topic »](/api/monoforum.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.readSavedHistory#ba4a3b5b parent_peer:InputPeer peer:InputPeer max_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **parent\_peer** | [InputPeer](/type/InputPeer.md) | ID of the monoforum group. |
| **peer** | [InputPeer](/type/InputPeer.md) | ID of the topic. |
| **max\_id** | [int](/type/int.md) | If a positive value is passed, only messages with identifiers less than or equal to the given one will be read. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHAT\_ADMIN\_REQUIRED | You must be an admin in this chat to do this. |
| 400 | PARENT\_PEER\_INVALID | The specified `parent_peer` is invalid. |

### Related pages

#### [Direct messages to channels](/api/monoforum.md)
Telegram supports direct messages to channels, which can also be used to suggest (even paid) channel posts.