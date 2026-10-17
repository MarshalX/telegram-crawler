# stories.albums

[Story albums »](/api/stories.md#story-albums).

```tl
stories.albums#c3987a3a hash:long albums:Vector<StoryAlbum> = stories.Albums;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash to pass to [stories.getAlbums](/method/stories.getAlbums.md) to avoid returning any results if they haven't changed. |
| **albums** | [Vector](/type/Vector%20t)&lt;[StoryAlbum](/type/StoryAlbum.md)&gt; | The albums. |

### Type
[stories.Albums](/type/stories.Albums.md)

### Related pages

#### [stories.getAlbums](/method/stories.getAlbums.md)
Get [story albums](/api/stories.md#story-albums) created by a peer.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.