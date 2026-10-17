# payments.clearSavedInfo

Clear saved payment information

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
payments.clearSavedInfo#d83d70c1 flags:# credentials:flags.0?true info:flags.1?true = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **credentials** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Remove saved payment credentials |
| **info** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Clear the last order settings saved by the user |

### Result
[Bool](/type/Bool.md)

### Only users can use this method