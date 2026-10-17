# account.createBusinessChatLink

Create a [business chat deep link »](/api/business.md#business-chat-links).

```tl
businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;
---functions---
account.createBusinessChatLink#8851e68e link:InputBusinessChatLink = BusinessChatLink;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **link** | [InputBusinessChatLink](/type/InputBusinessChatLink.md) | Info about the link to create. |

### Result
[BusinessChatLink](/type/BusinessChatLink.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHATLINKS\_TOO\_MUCH | Too many [business chat links](/api/business.md#business-chat-links) were created, please delete some older links. |
| 400 | DOCUMENT\_INVALID | The specified document is invalid. |
| 403 | PREMIUM\_ACCOUNT\_REQUIRED | A premium account is required to execute this action. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.