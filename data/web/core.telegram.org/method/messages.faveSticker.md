# messages.faveSticker

Mark or unmark a sticker as favorite

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.faveSticker#b9ffc55b id:InputDocument unfave:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **id** | [InputDocument](/type/InputDocument.md) | Sticker in question |
| **unfave** | [Bool](/type/Bool.md) | Whether to add or remove a sticker from favorites |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | STICKER\_ID\_INVALID | The provided sticker ID is invalid. |