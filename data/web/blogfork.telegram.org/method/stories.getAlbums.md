# stories.getAlbums

Get [story albums](/api/stories.md#story-albums) created by a peer.

```tl
stories.albumsNotModified#564edaeb = stories.Albums;
stories.albums#c3987a3a hash:long albums:Vector<StoryAlbum> = stories.Albums;
---functions---
stories.getAlbums#25b3eac7 peer:InputPeer hash:long = stories.Albums;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | The peer. |
| **hash** | [long](/type/long.md) | The `hash` from a previously returned [stories.albums](/constructor/stories.albums.md), to avoid returning any results if they haven't changed. |

### Result
[stories.Albums](/type/stories.Albums.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [stories.albums](/constructor/stories.albums.md)
[Story albums »](/api/stories.md#story-albums).

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.