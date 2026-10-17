# stories.togglePinnedToTop

Pin some stories to the top of the profile, see [here »](/api/stories.md#pinned-or-archived-stories) for more info.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stories.togglePinnedToTop#b297e9b peer:InputPeer id:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to pin stories. |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the stories to pin (max [stories\_pinned\_to\_top\_count\_max](/api/config.md#stories-pinned-to-top-count-max)). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_ID\_INVALID | The specified story ID is invalid. |

### Related pages

#### [Client configuration](/api/config.md)
The MTProto API has multiple configuration parameters that can be fetched with the appropriate methods.

#### [Telegram Stories](/api/stories.md)
Telegram users and channels can easily post and view stories through the API.