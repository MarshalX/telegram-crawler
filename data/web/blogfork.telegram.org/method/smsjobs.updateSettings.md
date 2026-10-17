# smsjobs.updateSettings

Update SMS job settings (official clients only).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
smsjobs.updateSettings#93fa0bf flags:# allow_international:flags.0?true = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **allow\_international** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Allow international numbers? |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | NOT\_JOINED | The current user hasn't joined the Peer-to-Peer Login Program. |