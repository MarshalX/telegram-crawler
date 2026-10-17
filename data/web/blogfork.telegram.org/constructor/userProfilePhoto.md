# userProfilePhoto

User profile photo.

```tl
userProfilePhoto#82d1f706 flags:# has_video:flags.0?true personal:flags.2?true photo_id:long stripped_thumb:flags.1?bytes dc_id:int = UserProfilePhoto;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **has\_video** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | Whether an [animated profile picture](/api/files.md#animated-profile-pictures) is available for this user |
| **personal** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | Whether this profile photo is only visible to us (i.e. it was set using [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md)). |
| **photo\_id** | [long](/type/long.md) | Identifier of the respective photo |
| **stripped\_thumb** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[bytes](/type/bytes.md) | [Stripped thumbnail](/api/files.md#stripped-thumbnails) |
| **dc\_id** | [int](/type/int.md) | DC ID where the photo is stored |

### Type
[UserProfilePhoto](/type/UserProfilePhoto.md)

### Related pages

#### [Uploading and Downloading Files](/api/files.md)
How to transfer large data batches correctly.

#### [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md)
Upload a custom profile picture for a contact, or suggest a new profile picture to a contact.

The `file`, `video` and `video_emoji_markup` flags are mutually exclusive.