# messages.installStickerSet

Install a stickerset

```tl
messages.stickerSetInstallResultSuccess#38641628 = messages.StickerSetInstallResult;
messages.stickerSetInstallResultArchive#35e410a8 sets:Vector<StickerSetCovered> = messages.StickerSetInstallResult;
---functions---
messages.installStickerSet#c78fe460 stickerset:InputStickerSet archived:Bool = messages.StickerSetInstallResult;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | Stickerset to install |
| **archived** | [Bool](/type/Bool.md) | Whether to archive stickerset |

### Result
[messages.StickerSetInstallResult](/type/messages.StickerSetInstallResult.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 406 | STICKERSET\_INVALID | The provided sticker set is invalid. |