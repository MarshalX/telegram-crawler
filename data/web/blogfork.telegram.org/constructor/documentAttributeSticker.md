# documentAttributeSticker

Defines a sticker

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===23===
documentAttributeSticker#fb0a5727 = DocumentAttribute;

===45===
documentAttributeSticker#3a556302 alt:string stickerset:InputStickerSet = DocumentAttribute;
```

#### API schema
<!-- /schema-blocks -->

```tl
documentAttributeSticker#6319d612 flags:# mask:flags.1?true alt:string stickerset:InputStickerSet mask_coords:flags.0?MaskCoords = DocumentAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **mask** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether this is a mask sticker |
| **alt** | [string](/type/string.md) | Alternative emoji representation of sticker |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Associated stickerset |
| **mask\_coords** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[MaskCoords](/type/MaskCoords.md) | Mask coordinates (if this is a mask sticker, attached to a photo) |

### Type
[DocumentAttribute](/type/DocumentAttribute.md)