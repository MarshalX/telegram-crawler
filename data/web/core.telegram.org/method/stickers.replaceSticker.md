# stickers.replaceSticker

Replace a sticker in a [stickerset »](/api/stickers.md).

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.replaceSticker#4696459a sticker:InputDocument new_sticker:InputStickerSetItem = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **sticker** | [InputDocument](/type/InputDocument.md) | Old sticker document. |
| **new\_sticker** | [InputStickerSetItem](/type/InputStickerSetItem.md) | New sticker. |

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