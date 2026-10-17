# messages.deleteQuickReplyShortcut

Completely delete a [quick reply shortcut](/api/business.md#quick-reply-shortcuts).  
This will also emit an [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md) update to other logged-in sessions (and *no* [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcuts are also deleted by this method).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
messages.deleteQuickReplyShortcut#3cc04740 shortcut_id:int = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | [Shortcut ID](/api/business.md#quick-reply-shortcuts) |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SHORTCUT\_INVALID | The specified shortcut is invalid. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [updateDeleteQuickReply](/constructor/updateDeleteQuickReply.md)
A [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) was deleted. This will **not** emit [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcut are also deleted by this update.

#### [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md)
One or more messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) were deleted.