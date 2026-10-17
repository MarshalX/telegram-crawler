# phone.saveCallLog

Deprecated: send libtgvoip phone call debug information

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
phone.saveCallLog#41248786 peer:InputPhoneCall file:InputFile = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPhoneCall](/type/InputPhoneCall.md) | Phone call |
| **file** | [InputFile](/type/InputFile.md) | Libtgvoip logs |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CALL\_PEER\_INVALID | The provided call peer object is invalid. |