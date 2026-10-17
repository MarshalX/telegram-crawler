# phone.sendSignalingData

Send VoIP [signaling data](/api/calls.md#signaling-data) for an ongoing phone call.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.sendSignalingData#ff7a9383 peer:InputPhoneCall data:bytes = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | Phone call |
| **data** | [bytes](/type/bytes.md) | Signaling payload |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_NOT\_ACTIVE | The specified call is not active. |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.