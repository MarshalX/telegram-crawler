# stickers.addStickerToSet

Add a sticker to a stickerset. The sticker set must have been created by the current user/bot.

```tl
messages.stickerSet#6e153f16 set:StickerSet packs:Vector<StickerPack> keywords:Vector<StickerKeyword> documents:Vector<Document> = messages.StickerSet;
messages.stickerSetNotModified#d3f924eb = messages.StickerSet;
---functions---
stickers.addStickerToSet#8653febe stickerset:InputStickerSet sticker:InputStickerSetItem = messages.StickerSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | The stickerset |
| **sticker** | [InputStickerSetItem](/type/InputStickerSetItem.md) | The sticker |

### Result
[messages.StickerSet](/type/messages.StickerSet.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKERPACK\_STICKERS\_TOO\_MUCH | There are too many stickers in this stickerpack, you can't add any more. |
| 406 | STICKERSET\_INVALID | The provided sticker set is invalid. |
| 400 | STICKERS\_TOO\_MUCH | There are too many stickers in this stickerpack, you can't add any more. |
| 400 | STICKER\_PNG\_NOPNG | One of the specified stickers is not a valid PNG file. |
| 400 | STICKER\_TGS\_NOTGS | Invalid TGS sticker provided. |