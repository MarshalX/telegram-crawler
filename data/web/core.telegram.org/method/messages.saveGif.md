# messages.saveGif

Add GIF to saved gifs list

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.saveGif#327a30cb id:InputDocument unsave:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputDocument](/type/InputDocument.md) | GIF to save |
| **unsave** | [Bool](/type/Bool.md) | Whether to remove GIF from saved gifs list |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | GIF\_ID\_INVALID | The provided GIF ID is invalid. |