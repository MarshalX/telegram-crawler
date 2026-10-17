# messages.editQuickReplyShortcut

Rename a [quick reply shortcut](/api/business.md#quick-reply-shortcuts).  
This will emit an [updateQuickReplies](/constructor/updateQuickReplies.md) update to other logged-in sessions.

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.editQuickReplyShortcut#5c003cef shortcut_id:int shortcut:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | [Shortcut ID](/api/business.md#quick-reply-shortcuts). |
| **shortcut** | [string](/type/string.md) | New shortcut name. |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |
| 400 | SHORTCUT\_INVALID | The specified shortcut is invalid. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [updateQuickReplies](/constructor/updateQuickReplies.md)
Info about or the order of [quick reply shortcuts »](/api/business.md#quick-reply-shortcuts) was changed.