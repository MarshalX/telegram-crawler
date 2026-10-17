# messages.getAttachedStickers

Get stickers attached to a photo or video

```tl
---functions---
messages.getAttachedStickers#cc5b67cc media:InputStickeredMedia = Vector<StickerSetCovered>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **media** | [InputStickeredMedia](/type/InputStickeredMedia.md) | Stickered media |

### Result
[Vector](/type/Vector%20t)&lt;[StickerSetCovered](/type/StickerSetCovered.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | MEDIA\_EMPTY | The provided media object is invalid. |