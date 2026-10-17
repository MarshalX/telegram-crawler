# photos.Photo

Photo with auxiliary data.

```tl
photos.photo#20212ca8 photo:Photo users:Vector<User> = photos.Photo;

---functions---

photos.updateProfilePhoto#9e82039 flags:# fallback:flags.0?true bot:flags.1?InputUser id:InputPhoto = photos.Photo;
photos.uploadProfilePhoto#388a3b5 flags:# fallback:flags.3?true bot:flags.5?InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.4?VideoSize = photos.Photo;
photos.uploadContactProfilePhoto#e14c4a71 flags:# suggest:flags.3?true save:flags.4?true user_id:InputUser file:flags.0?InputFile video:flags.1?InputFile video_start_ts:flags.2?double video_emoji_markup:flags.5?VideoSize = photos.Photo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [photos.photo](/constructor/photos.photo.md) | Photo with auxiliary data. |

### Methods

| Method | Description |
| --- | --- |
| [photos.updateProfilePhoto](/method/photos.updateProfilePhoto.md) | Installs a previously uploaded photo as a profile photo. |
| [photos.uploadProfilePhoto](/method/photos.uploadProfilePhoto.md) | Updates current user profile photo.\
\
The `file`, `video` and `video_emoji_markup` flags are mutually exclusive. |
| [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md) | Upload a custom profile picture for a contact, or suggest a new profile picture to a contact.\
\
The `file`, `video` and `video_emoji_markup` flags are mutually exclusive. |