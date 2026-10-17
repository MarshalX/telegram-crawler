# phone.sendGroupCallEncryptedMessage

Send an E2E-encrypted message or emoji reaction to all participants of a conference call. This method can only be used with conferences; see [here »](/api/end-to-end/group-calls.md#conference-in-call-messages) for the serialization and encryption process.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.sendGroupCallEncryptedMessage#e5afa56d call:InputGroupCall encrypted_message:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **call** | [InputGroupCall](/type/InputGroupCall.md) | Conference call that should receive the encrypted message or reaction |
| **encrypted\_message** | [bytes](/type/bytes.md) | Complete encrypted message or reaction packet produced as specified [here »](/api/end-to-end/group-calls.md#encrypting-and-sending-a-message) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GROUPCALL\_INVALID | The specified group call is invalid. |

### Related pages

#### [E2E Group Calls](/api/end-to-end/group-calls.md)
End-to-end encryption used for Telegram group voice and video calls, using a blockchain for state management.