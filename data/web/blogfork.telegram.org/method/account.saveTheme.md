# account.saveTheme

Save a theme

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.saveTheme#f257106c theme:InputTheme unsave:Bool = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **theme** | [InputTheme](/type/InputTheme.md) | Theme to save |
| **unsave** | [Bool](/type/Bool.md) | Unsave |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | THEME\_INVALID | Invalid theme provided. |