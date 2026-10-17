# account.businessChatLinks

Contains info about [business chat deep links »](/api/business.md#business-chat-links) created by the current account.

```tl
account.businessChatLinks#ec43a2d1 links:Vector<BusinessChatLink> chats:Vector<Chat> users:Vector<User> = account.BusinessChatLinks;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **links** | [Vector](/type/Vector%20t)&lt;[BusinessChatLink](/type/BusinessChatLink.md)&gt; | Links |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[account.BusinessChatLinks](/type/account.BusinessChatLinks.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.