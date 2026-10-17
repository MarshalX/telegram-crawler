# messages.saveDefaultSendAs

Change the default peer that should be used when sending messages, reactions, poll votes to a specific group

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.saveDefaultSendAs#ccfddf96 peer:InputPeer send_as:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Group |
| **send\_as** | [InputPeer](/type/InputPeer.md) | The default peer that should be used when sending messages to the group |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | SEND\_AS\_PEER\_INVALID | You can't send messages as the specified peer. |