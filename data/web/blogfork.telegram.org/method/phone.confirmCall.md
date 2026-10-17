# phone.confirmCall

[Complete phone call E2E encryption key exchange »](/api/end-to-end/voice-calls.md), see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

```tl
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;
---functions---
phone.confirmCall#2efe1722 peer:InputPhoneCall g_a:bytes key_fingerprint:long protocol:PhoneCallProtocol = phone.PhoneCall;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | The phone call |
| **g\_a** | [bytes](/type/bytes.md) | [Parameter for E2E encryption key exchange »](/api/end-to-end/voice-calls.md) |
| **key\_fingerprint** | [long](/type/long.md) | Key fingerprint |
| **protocol** | [PhoneCallProtocol](/type/PhoneCallProtocol.md) | Phone call settings |

### Result
[phone.PhoneCall](/type/phone.PhoneCall.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_ALREADY\_DECLINED | The call was already declined. |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |

### Related pages

#### [End-to-End Encrypted Voice Calls](/api/end-to-end/voice-calls.md)
Deprecated description of encryption in voice calls as implemented in Telegram apps older than version 7.0.

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.