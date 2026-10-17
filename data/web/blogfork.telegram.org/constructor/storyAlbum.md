# storyAlbum

Represents a [story album »](/api/stories.md#story-albums).

```tl
storyAlbum#9325705a flags:# album_id:int title:string icon_photo:flags.0?Photo icon_video:flags.1?Document = StoryAlbum;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **album\_id** | [int](/type/int.md) | ID of the album. |
| **title** | [string](/type/string.md) | Name of the album. |
| **icon\_photo** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Photo](/type/Photo.md) | Photo from the first story of the album, if it's a photo. |
| **icon\_video** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Document](/type/Document.md) | Video from the first story of the album, if it's a video. |

### Type
[StoryAlbum](/type/StoryAlbum.md)

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.