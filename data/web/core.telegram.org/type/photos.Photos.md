# photos.Photos

Object contains list of photos with auxiliary data.

```tl
photos.photos#8dca6aa5 photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photosSlice#15051f54 count:int photos:Vector<Photo> users:Vector<User> = photos.Photos;

---functions---

photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [photos.photos](/constructor/photos.photos.md) | Full list of photos with auxiliary data. |
| [photos.photosSlice](/constructor/photos.photosSlice.md) | Incomplete list of photos with auxiliary data. |

### Methods

| Method | Description |
| --- | --- |
| [photos.getUserPhotos](/method/photos.getUserPhotos.md) | Returns the list of user photos. |