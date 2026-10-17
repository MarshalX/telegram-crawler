# smsjobs.finishJob

Finish an SMS job (official clients only).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
smsjobs.finishJob#4f1ebf24 flags:# job_id:string error:flags.0?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **job\_id** | [string](/type/string.md) | Job ID. |
| **error** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If failed, the error. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SMSJOB\_ID\_INVALID | The specified job ID is invalid. |