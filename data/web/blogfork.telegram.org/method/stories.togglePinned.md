# stories.togglePinned

Pin or unpin one or more stories

```tl
---functions---
stories.togglePinned#9a75a1ef peer:InputPeer id:Vector<int> pinned:Bool = Vector<int>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where to pin or unpin stories |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of stories to pin or unpin |
| **pinned** | [Bool](/type/Bool.md) | Whether to pin or unpin the stories |

### Result
[Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt;

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |