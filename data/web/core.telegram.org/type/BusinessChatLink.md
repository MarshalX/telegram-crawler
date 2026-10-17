# BusinessChatLink

Contains info about a [business chat deep link »](/api/business.md#business-chat-links) created by the current account.

```tl
businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;

---functions---

account.createBusinessChatLink#8851e68e link:InputBusinessChatLink = BusinessChatLink;
account.editBusinessChatLink#8c3410af slug:string link:InputBusinessChatLink = BusinessChatLink;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [businessChatLink](/constructor/businessChatLink.md) | Contains info about a [business chat deep link »](/api/business.md#business-chat-links) created by the current account. |

### Methods

| Method | Description |
| --- | --- |
| [account.createBusinessChatLink](/method/account.createBusinessChatLink.md) | Create a [business chat deep link »](/api/business.md#business-chat-links). |
| [account.editBusinessChatLink](/method/account.editBusinessChatLink.md) | Edit a created [business chat deep link »](/api/business.md#business-chat-links). |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.