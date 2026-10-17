# VideoSize

Represents an animated video thumbnail

```tl
videoSize#de33b094 flags:# type:string w:int h:int size:int video_start_ts:flags.0?double = VideoSize;
videoSizeEmojiMarkup#f85c413c emoji_id:long background_colors:Vector<int> = VideoSize;
videoSizeStickerMarkup#da082fe stickerset:InputStickerSet sticker_id:long background_colors:Vector<int> = VideoSize;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [videoSize](/constructor/videoSize.md) | An [animated profile picture](/api/files.md#animated-profile-pictures) in MPEG4 format |
| [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md) | An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [custom emoji sticker](/api/custom-emoji.md). |
| [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md) | An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [sticker](/api/stickers.md). |