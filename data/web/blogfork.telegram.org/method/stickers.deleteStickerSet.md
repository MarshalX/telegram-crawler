# stickers.deleteStickerSet

Deletes a stickerset we created.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stickers.deleteStickerSet#87704394 stickerset:InputStickerSet = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Stickerset to delete |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKERSET\_INVALID | The provided sticker set is invalid. |