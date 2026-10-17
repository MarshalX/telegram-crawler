# inputChatUploadedPhoto

New photo to be set as group profile photo.

The `file`, `video` and `video_emoji_markup` flags are mutually exclusive.

```tl
inputChatUploadedPhoto#bdcdaec0 flags:# file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.3?VideoSize = InputChatPhoto;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **file** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputFile](/type/InputFile.md) | File saved in parts using the method [upload.saveFilePart](/method/upload.saveFilePart.md) |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputFile](/type/InputFile.md) | Square video for animated profile picture |
| **video\_start\_ts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[double](/type/double.md) | Floating point UNIX timestamp in seconds, indicating the frame of the video/sticker that should be used as static preview; can only be used if `video` or `video_emoji_markup` is set. |
| **video\_emoji\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[VideoSize](/type/VideoSize.md) | Animated sticker profile picture, must contain either a [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md) or a [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md) constructor. |

### Type
[InputChatPhoto](/type/InputChatPhoto.md)

### Related pages

#### [upload.saveFilePart](/method/upload.saveFilePart.md)
Saves a part of file for further sending to one of the methods.

#### [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [custom emoji sticker](/api/custom-emoji.md).

#### [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [sticker](/api/stickers.md).