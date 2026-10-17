# messages.saveRecentSticker

Add/remove sticker from recent stickers list

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.saveRecentSticker#392718f8 flags:# attached:flags.0?true id:InputDocument unsave:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **attached** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether to add/remove stickers recently attached to photo or video files |
| **id** | [InputDocument](/type/InputDocument.md) | Sticker |
| **unsave** | [Bool](/type/Bool.md) | Whether to save or unsave the sticker |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKER\_ID\_INVALID | The provided sticker ID is invalid. |