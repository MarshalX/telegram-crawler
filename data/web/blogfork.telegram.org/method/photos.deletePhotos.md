# photos.deletePhotos

Deletes profile photos. The method returns a list of successfully deleted photo IDs.

```tl
---functions---
photos.deletePhotos#87cf7f2f id:Vector<InputPhoto> = Vector<long>;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [Vector](/type/Vector%20t)&lt;[InputPhoto](/type/InputPhoto.md)&gt; | Input photos to delete |

### Result
[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt;

### Only users can use this method