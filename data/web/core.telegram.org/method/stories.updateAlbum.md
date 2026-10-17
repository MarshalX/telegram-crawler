# stories.updateAlbum

Rename a [story albums »](/api/stories.md#story-albums), or add, delete or reorder stories in it.

```tl
storyAlbum#9325705a flags:# album_id:int title:string icon_photo:flags.0?Photo icon_video:flags.1?Document = StoryAlbum;
---functions---
stories.updateAlbum#5e5259b6 flags:# peer:InputPeer album_id:int title:flags.0?string delete_stories:flags.1?Vector<int> add_stories:flags.2?Vector<int> order:flags.3?Vector<int> = StoryAlbum;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the album is posted. |
| **album\_id** | [int](/type/int.md) | Album ID. |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | New album title. |
| **delete\_stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If set, deletes the specified stories from the album. |
| **add\_stories** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If set, adds the specified stories to the album. |
| **order** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | If set, reorders the stories in the album by their IDs. |

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