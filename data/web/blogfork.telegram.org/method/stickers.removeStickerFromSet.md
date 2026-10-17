# stickers.removeStickerFromSet

Remove a sticker from the set where it belongs. The sticker set must have been created by the current user/bot.

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.removeStickerFromSet#f7760f51 sticker:InputDocument = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **sticker** | [InputDocument](/type/InputDocument.md) | The sticker to remove |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKER\_INVALID | The provided sticker is invalid. |