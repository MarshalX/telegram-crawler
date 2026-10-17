# auth.exportAuthorization

Returns data for copying authorization to another data-center.

```tl
auth.exportedAuthorization#b434e2b8 id:long bytes:bytes = auth.ExportedAuthorization;
---functions---
auth.exportAuthorization#e5bfffcd dc_id:int = auth.ExportedAuthorization;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **dc\_id** | [int](/type/int.md) | Number of a target data-center |

### Result
[auth.ExportedAuthorization](/type/auth.ExportedAuthorization.md)

### Both users and bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DC\_ID\_INVALID | The provided DC ID is invalid. |