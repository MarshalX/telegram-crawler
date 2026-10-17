# account.finishTakeoutSession

Terminate a [takeout session, see here » for more info](/api/takeout.md).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.finishTakeoutSession#1d2652ee flags:# success:flags.0?true = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **success** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Data exported successfully |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | TAKEOUT\_REQUIRED | A [takeout](/api/takeout.md) session needs to be initialized first, [see here &raquo; for more info](/api/takeout.md). |

### Related pages

#### [Takeout API](/api/takeout.md)
Telegram's API allows users to export all of their information through the takeout API.