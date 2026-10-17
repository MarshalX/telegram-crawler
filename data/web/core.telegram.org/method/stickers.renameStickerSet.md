# stickers.renameStickerSet

Renames a stickerset.

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.renameStickerSet#124b1c00 stickerset:InputStickerSet title:string = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Stickerset to rename |
| **title** | [string](/type/string.md) | New stickerset title |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKERSET\_INVALID | The provided sticker set is invalid. |