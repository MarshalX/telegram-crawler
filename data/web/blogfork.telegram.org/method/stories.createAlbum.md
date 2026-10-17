# stories.createAlbum

Creates a [story album](/api/stories.md#story-albums).

```tl
storyAlbum#9325705a flags:# album_id:int title:string icon_photo:flags.0?Photo icon_video:flags.1?Document = StoryAlbum;
---functions---
stories.createAlbum#a36396e5 peer:InputPeer title:string stories:Vector<int> = StoryAlbum;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The owned peer where to create the album. |
| **title** | [string](/type/string.md) | Album name. |
| **stories** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | Stories to add to the album. |

### Result
[StoryAlbum](/type/StoryAlbum.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.