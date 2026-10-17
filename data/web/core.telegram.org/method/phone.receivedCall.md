# phone.receivedCall

Optional: notify the server that the user is currently busy in a call: this will automatically refuse all incoming phone calls until the current phone call is ended, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.receivedCall#17d54f61 peer:InputPhoneCall = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | The phone call we're currently in |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_ALREADY\_DECLINED | The call was already declined. |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.