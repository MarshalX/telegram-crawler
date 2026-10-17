# messages.checkQuickReplyShortcut

Before offering the user the choice to add a message to a [quick reply shortcut](/api/business.md#quick-reply-shortcuts), to make sure that none of the limits specified [here »](/api/business.md#quick-reply-shortcuts) were reached.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.checkQuickReplyShortcut#f1d0fbd3 shortcut:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut** | [string](/type/string.md) | Shorcut name (not ID!). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.