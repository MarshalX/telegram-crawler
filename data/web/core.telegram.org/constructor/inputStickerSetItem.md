# inputStickerSetItem

Sticker in a stickerset

```tl
inputStickerSetItem#32da9e9c flags:# document:InputDocument emoji:string mask_coords:flags.0?MaskCoords keywords:flags.1?string = InputStickerSetItem;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **document** | [InputDocument](/type/InputDocument.md) | The sticker |
| **emoji** | [string](/type/string.md) | Associated emoji |
| **mask\_coords** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[MaskCoords](/type/MaskCoords.md) | Coordinates for mask sticker |
| **keywords** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Set of keywords, separated by commas (can't be provided for mask stickers) |

### Type
[InputStickerSetItem](/type/InputStickerSetItem.md)