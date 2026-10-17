# stickers.checkShortName

Check whether the given short name is available

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
stickers.checkShortName#284b3639 short_name:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **short\_name** | [string](/type/string.md) | Short name |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SHORT\_NAME\_INVALID | The specified short name is invalid. |
| 400 | SHORT\_NAME\_OCCUPIED | The specified short name is already in use. |