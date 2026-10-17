# updateQuickReplyMessage

A new message was added to a [quick reply shortcut »](/api/business.md#quick-reply-shortcuts).

```tl
updateQuickReplyMessage#3e050d0f message:Message = Update;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **message** | [Message](/type/Message.md) | The message that was added (the [message](/constructor/message.md).`quick_reply_shortcut_id` field will contain the shortcut ID). |

### Type
[Update](/type/Update.md)

### Related pages

#### [message](/constructor/message.md)
A message

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.