# documentAttributeCustomEmoji

Info about a custom emoji

```tl
documentAttributeCustomEmoji#fd149899 flags:# free:flags.0?true text_color:flags.1?true alt:string stickerset:InputStickerSet = DocumentAttribute;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **free** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether this custom emoji can be sent by non-Premium users |
| **text\_color** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Whether the color of this custom emoji should be changed to the text color when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context. |
| **alt** | [string](/type/string.md) | The actual emoji |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | The emoji stickerset to which this emoji belongs. |

### Type
[DocumentAttribute](/type/DocumentAttribute.md)