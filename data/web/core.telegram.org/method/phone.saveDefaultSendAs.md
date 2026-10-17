# phone.saveDefaultSendAs

Save the default peer displayed as the author of live story comments and reactions, see [in-call messages »](/api/group-calls.md#in-call-messages).

It cannot be used for normal video chats/livestreams, where in-call messages are sent as the peer used to join the call (`join_as`).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.saveDefaultSendAs#4167add1 call:InputGroupCall send_as:InputPeer = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Live story group call |
| **send\_as** | [InputPeer](/type/InputPeer.md) | Peer to display as the author of subsequent comments and reactions |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

#### [Group calls](/api/group-calls.md)
How to start, join and manage group calls and video chats.