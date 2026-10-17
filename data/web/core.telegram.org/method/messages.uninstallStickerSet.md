# messages.uninstallStickerSet

Uninstall a stickerset

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.uninstallStickerSet#f96e55de stickerset:InputStickerSet = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | The stickerset to uninstall |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | STICKERSET\_INVALID | The provided sticker set is invalid. |