# bots.answerWebhookJSONQuery

Answers a custom query; for bots only

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
bots.answerWebhookJSONQuery#e6213f4d query_id:long data:DataJSON = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query\_id** | [long](/type/long.md) | Identifier of a custom query |
| **data** | [DataJSON](/type/DataJSON.md) | JSON-serialized answer to the query |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | DATA\_JSON\_INVALID | The provided JSON data is invalid. |
| 400 | QUERY\_ID\_INVALID | The query ID is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |