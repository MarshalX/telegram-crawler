# stickers.changeSticker

Update the keywords, emojis or [mask coordinates](/api/stickers.md#mask-stickers) of a sticker.

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.changeSticker#f5537ebc flags:# sticker:InputDocument emoji:flags.0?string mask_coords:flags.1?MaskCoords keywords:flags.2?string = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **sticker** | [InputDocument](/type/InputDocument.md) | The sticker |
| **emoji** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | If set, updates the emoji list associated to the sticker |
| **mask\_coords** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[MaskCoords](/type/MaskCoords.md) | If set, updates the [mask coordinates](/api/stickers.md#mask-stickers) |
| **keywords** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[string](/type/string.md) | If set, updates the sticker keywords (separated by commas). Can't be provided for mask stickers. |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKER\_INVALID | The provided sticker is invalid. |

### Related pages

#### [Stickers and masks](/api/stickers.md)
Telegram clients support displaying static and animated stickers.