# Stories.Albums

Represents a list of [story albums »](/api/stories.md#story-albums).

```tl
stories.albumsNotModified#564edaeb = stories.Albums;
stories.albums#c3987a3a hash:long albums:Vector<StoryAlbum> = stories.Albums;

---functions---

stories.getAlbums#25b3eac7 peer:InputPeer hash:long = stories.Albums;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [stories.albumsNotModified](/constructor/stories.albumsNotModified.md) | The [story album list »](/api/stories.md#story-albums) hasn't changed. |
| [stories.albums](/constructor/stories.albums.md) | [Story albums »](/api/stories.md#story-albums). |

### Methods

| Method | Description |
| --- | --- |
| [stories.getAlbums](/method/stories.getAlbums.md) | Get [story albums](/api/stories.md#story-albums) created by a peer. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.