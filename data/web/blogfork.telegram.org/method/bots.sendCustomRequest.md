# bots.sendCustomRequest

Sends a custom request; for bots only

```tl
dataJSON#7d748d04 data:string = DataJSON;
---functions---
bots.sendCustomRequest#aa2769ed custom_method:string params:DataJSON = DataJSON;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **custom\_method** | [string](/type/string.md) | The method name |
| **params** | [DataJSON](/type/DataJSON.md) | JSON-serialized method parameters |

### Result
[DataJSON](/type/DataJSON.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DATA\_JSON\_INVALID | The provided JSON data is invalid. |
| 400 | METHOD\_INVALID | The specified method is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |