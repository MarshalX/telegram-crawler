# updateDeleteQuickReply

A [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) was deleted. This will **not** emit [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md) updates, even if all the messages in the shortcut are also deleted by this update.

```tl
updateDeleteQuickReply#53e6f1ec shortcut_id:int = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | ID of the quick reply shortcut that was deleted. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.

#### [updateDeleteQuickReplyMessages](/constructor/updateDeleteQuickReplyMessages.md)
One or more messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) were deleted.