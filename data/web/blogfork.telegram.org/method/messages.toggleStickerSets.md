# messages.toggleStickerSets

Apply changes to multiple stickersets

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.toggleStickerSets#b5052fea flags:# uninstall:flags.0?true archive:flags.1?true unarchive:flags.2?true stickersets:Vector<InputStickerSet> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **uninstall** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Uninstall the specified stickersets |
| **archive** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Archive the specified stickersets |
| **unarchive** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Unarchive the specified stickersets |
| **stickersets** | [Vector](/type/Vector%20t)&lt;[InputStickerSet](/type/InputStickerSet.md)&gt; | Stickersets to act upon |

### Result
[Bool](/type/Bool.md)

### Only users can use this method