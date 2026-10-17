# DocumentAttribute

Various possible attributes of a document (used to define if it's a sticker, a GIF, a video, a mask sticker, an image, an audio, and so on)

<!-- schema-blocks -->
#### [End-to-end schema](/schema/end-to-end.md)

```
===23===
documentAttributeAnimated#11b58939 = DocumentAttribute;
documentAttributeAudio#051448e5 duration:int = DocumentAttribute;
documentAttributeFilename#15590068 file_name:string = DocumentAttribute;
documentAttributeImageSize#6c37c15c w:int h:int = DocumentAttribute;
documentAttributeSticker#fb0a5727 = DocumentAttribute;
documentAttributeVideo#5910cccb duration:int w:int h:int = DocumentAttribute;

===45===
documentAttributeAudio#ded218e0 duration:int title:string performer:string = DocumentAttribute;
documentAttributeSticker#3a556302 alt:string stickerset:InputStickerSet = DocumentAttribute;

===46===
documentAttributeAudio#9852f9c6 flags:# duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;

===66===
documentAttributeVideo#0ef02ce6 flags:# duration:int w:int h:int = DocumentAttribute;
```

API schema:
<!-- /schema-blocks -->

```tl
documentAttributeImageSize#6c37c15c w:int h:int = DocumentAttribute;
documentAttributeAnimated#11b58939 = DocumentAttribute;
documentAttributeSticker#6319d612 flags:# mask:flags.1?true alt:string stickerset:InputStickerSet mask_coords:flags.0?MaskCoords = DocumentAttribute;
documentAttributeVideo#43c57c48 flags:# round_message:flags.0?true supports_streaming:flags.1?true nosound:flags.3?true duration:double w:int h:int preload_prefix_size:flags.2?int video_start_ts:flags.4?double video_codec:flags.5?string = DocumentAttribute;
documentAttributeAudio#9852f9c6 flags:# voice:flags.10?true duration:int title:flags.0?string performer:flags.1?string waveform:flags.2?bytes = DocumentAttribute;
documentAttributeFilename#15590068 file_name:string = DocumentAttribute;
documentAttributeHasStickers#9801d2f7 = DocumentAttribute;
documentAttributeCustomEmoji#fd149899 flags:# free:flags.0?true text_color:flags.1?true alt:string stickerset:InputStickerSet = DocumentAttribute;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [documentAttributeImageSize](/constructor/documentAttributeImageSize.md) | Defines the width and height of an image uploaded as document |
| [documentAttributeAnimated](/constructor/documentAttributeAnimated.md) | Defines an animated GIF |
| [documentAttributeSticker](/constructor/documentAttributeSticker.md) | Defines a sticker |
| [documentAttributeVideo](/constructor/documentAttributeVideo.md) | Defines a video |
| [documentAttributeAudio](/constructor/documentAttributeAudio.md) | Represents an audio file |
| [documentAttributeFilename](/constructor/documentAttributeFilename.md) | A simple document with a file name |
| [documentAttributeHasStickers](/constructor/documentAttributeHasStickers.md) | Whether the current document has stickers attached |
| [documentAttributeCustomEmoji](/constructor/documentAttributeCustomEmoji.md) | Info about a custom emoji |