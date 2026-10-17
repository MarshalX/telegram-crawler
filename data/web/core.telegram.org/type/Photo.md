# Photo

Object describes a photo.

```tl
photoEmpty#2331b22d id:long = Photo;
photo#fb197a65 flags:# has_stickers:flags.0?true id:long access_hash:long file_reference:bytes date:int sizes:Vector<PhotoSize> video_sizes:flags.1?Vector<VideoSize> dc_id:int = Photo;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [photoEmpty](/constructor/photoEmpty.md) | Empty constructor, non-existent photo |
| [photo](/constructor/photo.md) | Photo |