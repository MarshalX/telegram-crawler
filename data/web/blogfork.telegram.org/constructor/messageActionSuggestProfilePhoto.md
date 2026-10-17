# messageActionSuggestProfilePhoto

A new profile picture was suggested using [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md).

```tl
messageActionSuggestProfilePhoto#57de635e photo:Photo = MessageAction;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **photo** | [Photo](/type/Photo.md) | The photo that the user suggested we set as profile picture. |

### Type
[MessageAction](/type/MessageAction.md)

### Related pages

#### [photos.uploadContactProfilePhoto](/method/photos.uploadContactProfilePhoto.md)
Upload a custom profile picture for a contact, or suggest a new profile picture to a contact.

The `file`, `video` and `video_emoji_markup` flags are mutually exclusive.