# messages.setBotShippingResults

If you sent an invoice requesting a shipping address and the parameter is\_flexible was specified, the bot will receive an [updateBotShippingQuery](/constructor/updateBotShippingQuery.md) update. Use this method to reply to shipping queries.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setBotShippingResults#e5f672fa flags:# query_id:long error:flags.0?string shipping_options:flags.1?Vector<ShippingOption> = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **query\_id** | [long](/type/long.md) | Unique identifier for the query to be answered |
| **error** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable"). Telegram will display this message to the user. |
| **shipping\_options** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[Vector](/type/Vector%20t)&lt;[ShippingOption](/type/ShippingOption.md)&gt; | A vector of available shipping options. |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | QUERY\_ID\_INVALID | The query ID is invalid. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [updateBotShippingQuery](/constructor/updateBotShippingQuery.md)
This object contains information about an incoming shipping query.