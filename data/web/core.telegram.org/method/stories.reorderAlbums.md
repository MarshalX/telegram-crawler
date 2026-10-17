# stories.reorderAlbums

Reorder [story albums on a profile »](/api/stories.md#story-albums).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stories.reorderAlbums#8535fbd9 peer:InputPeer order:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the albums are located. |
| **order** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | New order of the albums. |

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