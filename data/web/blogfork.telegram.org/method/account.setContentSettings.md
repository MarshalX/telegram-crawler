# account.setContentSettings

Set sensitive content settings (for viewing or hiding NSFW content)

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.setContentSettings#b574b16b flags:# sensitive_enabled:flags.0?true = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sensitive\_enabled** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Enable NSFW content |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | SENSITIVE\_CHANGE\_FORBIDDEN | You can't change your sensitive content settings. |