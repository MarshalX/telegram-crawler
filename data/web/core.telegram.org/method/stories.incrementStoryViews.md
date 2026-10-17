# stories.incrementStoryViews

Increment the view counter of one or more stories.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stories.incrementStoryViews#b2028afb peer:InputPeer id:Vector<int> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **peer** | [InputPeer](/type/InputPeer.md) | Peer where the stories were posted. |
| **id** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the stories (maximum 200 at a time). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | PEER\_ID\_INVALID | The provided peer id is invalid. |
| 400 | STORY\_ID\_EMPTY | You specified no story IDs. |