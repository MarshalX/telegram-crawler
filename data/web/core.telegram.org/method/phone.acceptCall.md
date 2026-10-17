# phone.acceptCall

Accept incoming call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

```tl
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
---functions---
phone.acceptCall#3bd2b4a0 peer:InputPhoneCall g_b:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | The call to accept |
| **g\_b** | [bytes](/type/bytes.md) | [Parameter for E2E encryption key exchange »](/api/end-to-end/voice-calls.md) |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Phone call settings |

### Result
[phone.PhoneCall](/type/phone.PhoneCall.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_ALREADY\_ACCEPTED | The call was already accepted. |
| 400 | CALL\_ALREADY\_DECLINED | The call was already declined. |
| 500 | CALL\_OCCUPY\_FAILED | The call failed because the user is already making another call. |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |
| 406 | CALL\_PROTOCOL\_COMPAT\_LAYER\_INVALID | The other side of the call does not support any of the VoIP protocols supported by the local client, as specified by the `protocol.layer` and `protocol.library_versions` fields. |
| 400 | CALL\_PROTOCOL\_FLAGS\_INVALID | Call protocol flags invalid. |
| 400 | CALL\_PROTOCOL\_LAYER\_INVALID | The specified protocol layer version range is invalid. |

### Related pages

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.