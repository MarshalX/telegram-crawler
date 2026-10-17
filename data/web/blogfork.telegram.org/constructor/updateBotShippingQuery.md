# updateBotShippingQuery

This object contains information about an incoming shipping query.

```tl
updateBotShippingQuery#b5aefd7d query_id:long user_id:long payload:bytes shipping_address:PostAddress = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **query\_id** | [long](/type/long.md) | Unique query identifier |
| **user\_id** | [long](/type/long.md) | User who sent the query |
| **payload** | [bytes](/type/bytes.md) | Bot specified invoice payload |
| **shipping\_address** | [PostAddress](/type/PostAddress.md) | User specified shipping address |

### Type
[Update](/type/Update.md)