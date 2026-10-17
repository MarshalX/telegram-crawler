# channels.setStickers

Associate a stickerset to the supergroup

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
channels.setStickers#ea8ca4f9 channel:InputChannel stickerset:InputStickerSet = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **channel** | [InputChannel](/type/InputChannel.md) | Supergroup |
| **stickerset** | [InputStickerSet](/type/InputStickerSet.md) | The stickerset to associate |

### Result
[Bool](/type/Bool.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_INVALID | The provided channel is invalid. |
| 400 | CHAT\_ID\_INVALID | The provided chat id is invalid. |
| 400 | PARTICIPANTS\_TOO\_FEW | Not enough participants. |
| 406 | STICKERSET\_OWNER\_ANONYMOUS | Provided stickerset can't be installed as group stickerset to prevent admin deanonymization. |