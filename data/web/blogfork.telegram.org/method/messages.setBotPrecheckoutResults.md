# messages.setBotPrecheckoutResults

Once the user has confirmed their payment and shipping details, the bot receives an [updateBotPrecheckoutQuery](/constructor/updateBotPrecheckoutQuery.md) update.  
Use this method to respond to such pre-checkout queries.  
**Note**: Telegram must receive an answer within 10 seconds after the pre-checkout query was sent.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.setBotPrecheckoutResults#9c2dd95 flags:# success:flags.1?true query_id:long error:flags.0?string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **success** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | Set this flag if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order, otherwise do not set it, and set the `error` field, instead |
| **query\_id** | [long](/type/long.md) | Unique identifier for the query to be answered |
| **error** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[string](/type/string.md) | Required if the `success` isn't set. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. |

### Result
[Bool](/type/Bool.md)

### Only bots can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | ERROR\_TEXT\_EMPTY | The provided error message is empty. |
| 400 | USER\_BOT\_REQUIRED | This method can only be called by a bot. |

### Related pages

#### [updateBotPrecheckoutQuery](/constructor/updateBotPrecheckoutQuery.md)
This object contains information about an incoming pre-checkout query.