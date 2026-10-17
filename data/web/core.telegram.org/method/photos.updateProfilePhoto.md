# photos.updateProfilePhoto

Installs a previously uploaded photo as a profile photo.

```tl
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;
---functions---
photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **fallback** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | If set, the chosen profile photo will be shown to users that can't display your main profile photo due to your privacy settings. |
| **bot** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[InputUser](/type/InputUser.md) | Can contain info of a bot we own, to change the profile photo of that bot, instead of the current user. |
| **id** | [InputPhoto](/type/InputPhoto.md) | Input photo |

### Result
[photos.Photo](/type/photos.Photo.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ALBUM\_PHOTOS\_TOO\_MANY | You have uploaded too many profile photos, delete some before retrying. |
| 400 | BOT\_FALLBACK\_UNSUPPORTED | The fallback flag can't be set for bots. |
| 400 | FILE\_PARTS\_INVALID | The number of file parts is invalid. |
| 400 | IMAGE\_PROCESS\_FAILED | Failure while processing image. |
| 400 | LOCATION\_INVALID | The provided location is invalid. |
| 400 | PHOTO\_CROP\_SIZE\_SMALL | Photo is too small. |
| 400 | PHOTO\_EXT\_INVALID | The extension of the photo is invalid. |
| 400 | PHOTO\_ID\_INVALID | Photo ID invalid. |