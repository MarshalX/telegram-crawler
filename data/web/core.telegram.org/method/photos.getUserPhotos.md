# photos.getUserPhotos

Returns the list of user photos.

```tl
photos.photos#8dca6aa5 photos:Vector<Photo> users:Vector<User> = photos.Photos;
photos.photosSlice#15051f54 count:int photos:Vector<Photo> users:Vector<User> = photos.Photos;
---functions---
photos.getUserPhotos#91cd32a8 user_id:InputUser offset:int max_id:long limit:int = photos.Photos;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **user\_id** | [InputUser](/type/InputUser.md) | User ID |
| **offset** | [int](/type/int.md) | Number of list elements to be skipped |
| **max\_id** | [long](/type/long.md) | If a positive value was transferred, the method will return only photos with IDs less than the set one. This parameter is often useful when [refetching file references »](/api/file-references.md), as in conjuction with `limit=1` and `offset=-1` the [photo](/constructor/photo.md) object with the `id` specified in `max_id` can be fetched. |
| **limit** | [int](/type/int.md) | Number of list elements to be returned |

### Result
[photos.Photos](/type/photos.Photos.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHANNEL\_PRIVATE | You haven't joined this channel/supergroup. |
| 400 | MAX\_ID\_INVALID | The provided max ID is invalid. |
| 400 | MSG\_ID\_INVALID | Invalid message ID provided. |
| 400 | USER\_ID\_INVALID | The provided user ID is invalid. |

### Related pages

#### [File references](/api/file-references.md)
How to handle file references.

#### [photo](/constructor/photo.md)
Photo