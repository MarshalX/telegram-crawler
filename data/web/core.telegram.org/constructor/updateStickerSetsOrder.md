# updateStickerSetsOrder

The order of stickersets was changed

```tl
updateStickerSetsOrder#bb2d201 flags:# masks:flags.0?true emojis:flags.1?true order:Vector<long> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **masks** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether the updated stickers are mask stickers |
| **emojis** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the updated stickers are custom emoji stickers |
| **order** | [Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | New sticker order by sticker ID |

### Type
[Update](/type/Update.md)