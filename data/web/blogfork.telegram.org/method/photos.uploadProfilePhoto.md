# photos.uploadProfilePhoto

Updates current user profile photo.

The `file`, `video` and `video_emoji_markup` flags are mutually exclusive.

```tl
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
---functions---
photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **fallback** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, the chosen profile photo will be shown to users that can't display your main profile photo due to your privacy settings. |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[InputUser](/type/InputUser.md) | Can contain info of a bot we own, to change the profile photo of that bot, instead of the current user. |
| **file** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputFile](/type/InputFile.md) | Profile photo |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputFile](/type/InputFile.md) | [Animated profile picture](/api/files.md#animated-profile-pictures) video |
| **video\_start\_ts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[double](/type/double.md) | Floating point UNIX timestamp in seconds, indicating the frame of the video/sticker that should be used as static preview; can only be used if `video` or `video_emoji_markup` is set. |
| **video\_emoji\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[VideoSize](/type/VideoSize.md) | Animated sticker profile picture, must contain either a [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md) or a [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md) constructor. |

### Result
[photos.Photo](/type/photos.Photo.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ALBUM\_PHOTOS\_TOO\_MANY | You have uploaded too many profile photos, delete some before retrying. |
| 400 | BOT\_INVALID | This is not a valid bot. |
| 400 | EMOJI\_MARKUP\_INVALID | The specified `video_emoji_markup` was invalid. |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 400 | PHOTO\_CROP\_FILE\_MISSING | Photo crop file missing. |
| 400 | PHOTO\_CROP\_SIZE\_SMALL | Photo is too small. |
| 400 | PHOTO\_EXT\_INVALID | The extension of the photo is invalid. |
| 400 | PHOTO\_FILE\_MISSING | Profile photo file missing. |
| 400 | PHOTO\_INVALID | Photo invalid. |
| 400 | STICKER\_MIME\_INVALID | The specified sticker MIME type is invalid. |
| 400 | VIDEO\_FILE\_INVALID | The specified video file is invalid. |

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [custom emoji sticker](/api/custom-emoji.md).

#### [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [sticker](/api/stickers.md).