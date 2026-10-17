# messages.getQuickReplies

Fetch basic info about all existing [quick reply shortcuts](/api/business.md#quick-reply-shortcuts).

```tl
messages.quickReplies#c68d6695 quick_replies:Vector<QuickReply> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.QuickReplies;
messages.quickRepliesNotModified#5f91eb5b = messages.QuickReplies;
---functions---
messages.getQuickReplies#d483f2a8 hash:long = messages.QuickReplies;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **hash** | [long](/type/long.md) | Hash for pagination, generated as specified [here »](/api/business.md#quick-reply-shortcuts) (not the usual algorithm used for hash generation.) |

### Result
[messages.QuickReplies](/type/messages.QuickReplies.md)

### Only users can use this method

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.