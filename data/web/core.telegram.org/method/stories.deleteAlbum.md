# stories.deleteAlbum

Delete a [story album](/api/stories.md#story-albums).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stories.deleteAlbum#8d3456d0 peer:InputPeer album_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Owned peer where the album is located. |
| **album\_id** | [int](/type/int.md) | ID of the album to delete. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |

### Related pages

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.