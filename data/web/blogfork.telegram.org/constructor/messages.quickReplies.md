# messages.quickReplies

Info about [quick reply shortcuts »](/api/business.md#quick-reply-shortcuts).

```tl
messages.quickReplies#c68d6695 quick_replies:Vector<QuickReply> messages:Vector<Message> chats:Vector<Chat> users:Vector<User> = messages.QuickReplies;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **quick\_replies** | [Vector](/type/Vector%20t)&lt;[QuickReply](/type/QuickReply.md)&gt; | Quick reply shortcuts. |
| **messages** | [Vector](/type/Vector%20t)&lt;[Message](/type/Message.md)&gt; | Messages mentioned in `quick_replies`. |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[messages.QuickReplies](/type/messages.QuickReplies.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.