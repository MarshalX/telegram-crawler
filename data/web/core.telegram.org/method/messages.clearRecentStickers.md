# messages.clearRecentStickers

Clear recent stickers

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.clearRecentStickers#8999602d flags:# attached:flags.0?true = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **attached** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Set this flag to clear the list of stickers recently attached to photo or video files |

### Result
[Bool](/type/Bool.md)

### Only users can use this method