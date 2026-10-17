# updateDeleteQuickReplyMessages

One or more messages in a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts) were deleted.

```tl
updateDeleteQuickReplyMessages#566fe7cd shortcut_id:int messages:Vector<int> = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **shortcut\_id** | [int](/type/int.md) | Quick reply shortcut ID. |
| **messages** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | IDs of the deleted messages. |

### Type
[Update](/type/Update.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.