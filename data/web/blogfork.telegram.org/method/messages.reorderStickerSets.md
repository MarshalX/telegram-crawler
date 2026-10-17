# messages.reorderStickerSets

Reorder installed stickersets

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.reorderStickerSets#78337739 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Reorder mask stickersets |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Reorder [custom emoji stickersets](/api/custom-emoji.md) |
| **order** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | New stickerset order by stickerset IDs |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.