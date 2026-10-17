# phone.saveCallDebug

Send [phone call](/api/calls.md#call-debug) debug data to server.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.saveCallDebug#277add7e peer:InputPhoneCall debug:DataJSON = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | Phone call |
| **debug** | [DataJSON](/type/DataJSON.md) | Debug statistics obtained from tgcalls |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |
| 400 | DATA\_JSON\_INVALID | The provided JSON data is invalid. |

### Related pages

#### [Phone calls](/api/calls.md)
Telegram supports end-to-end-encrypted one-to-one voice and video calls.