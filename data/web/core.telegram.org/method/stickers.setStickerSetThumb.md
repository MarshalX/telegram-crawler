# stickers.setStickerSetThumb

Set stickerset thumbnail

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.setStickerSetThumb#a76a5392 flags:# stickerset:InputStickerSet thumb:flags.0?InputDocument thumb_document_id:flags.1?long = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Stickerset |
| **thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputDocument](/type/InputDocument.md) | Thumbnail (only for normal stickersets, not custom emoji stickersets). |
| **thumb\_document\_id** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[long](/type/long.md) | Only for [custom emoji stickersets](/api/custom-emoji.md), ID of a custom emoji present in the set to use as thumbnail; pass 0 to fallback to the first custom emoji of the set. |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKERSET\_INVALID | The provided sticker set is invalid. |
| 400 | STICKER\_THUMB\_PNG\_NOPNG | Incorrect stickerset thumb file provided, PNG / WEBP expected. |
| 400 | STICKER\_THUMB\_TGS\_NOTGS | Incorrect stickerset TGS thumb file provided. |

### Related pages

#### [Custom emojis](/api/custom-emoji.md)
Telegram allows including animated and static custom emojis inside of messages.