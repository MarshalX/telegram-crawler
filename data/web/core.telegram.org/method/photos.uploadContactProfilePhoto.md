# photos.uploadContactProfilePhoto

Upload a custom profile picture for a contact, or suggest a new profile picture to a contact.

The `file`, `video` and `video_emoji_markup` flags are mutually exclusive.

```tl
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
---functions---
photos.uploadContactProfilePhoto#e14c4a71 flags:# suggest:flags.3?true save:flags.4?true user_id:InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.5?VideoSize = photos.Photo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **suggest** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | If set, will send a [messageActionSuggestProfilePhoto](/constructor/messageActionSuggestProfilePhoto.md) service message to `user_id`, suggesting them to use the specified profile picture; otherwise, will set a personal profile picture for the user (only visible to the current user). |
| **save** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[true](/constructor/true.md) | If set, removes a previously set personal profile picture (does not affect suggested profile pictures, to remove them simply delete the [messageActionSuggestProfilePhoto](/constructor/messageActionSuggestProfilePhoto.md) service message with [messages.deleteMessages](/method/messages.deleteMessages.md)). |
| **user\_id** | [InputUser](/type/InputUser.md) | The contact |
| **file** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[InputFile](/type/InputFile.md) | Profile photo |
| **video** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputFile](/type/InputFile.md) | [Animated profile picture](/api/files.md#animated-profile-pictures) video |
| **video\_start\_ts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[double](/type/double.md) | Floating point UNIX timestamp in seconds, indicating the frame of the video/sticker that should be used as static preview; can only be used if `video` or `video_emoji_markup` is set. |
| **video\_emoji\_markup** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[VideoSize](/type/VideoSize.md) | Animated sticker profile picture, must contain either a [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md) or a [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md) constructor. |

### Result
[photos.Photo](/type/photos.Photo.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CONTACT\_MISSING | The specified user is not a contact. |
| 400 | NEED\_ACTION\_MISSING | The caller didn't specify a valid action (either save or suggest) for the contact profile photo upload. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [messageActionSuggestProfilePhoto](/constructor/messageActionSuggestProfilePhoto.md)
A new profile picture was suggested using [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md).

#### [messages.deleteMessages](/method/messages.deleteMessages.md)
Deletes messages by their identifiers.

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [videoSizeEmojiMarkup](/constructor/videoSizeEmojiMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [custom emoji sticker](/api/custom-emoji.md).

#### [videoSizeStickerMarkup](/constructor/videoSizeStickerMarkup.md)
An [animated profile picture](/api/files.md#animated-profile-pictures) based on a [sticker](/api/stickers.md).