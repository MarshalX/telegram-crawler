# account.deleteBusinessChatLink

Delete a [business chat deep link »](/api/business.md#business-chat-links).

```tl
boolFalse#bc799737 = Bool;
boolTrue#997275b5 = Bool;
---functions---
account.deleteBusinessChatLink#60073674 slug:string = Bool;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **slug** | [string](/type/string.md) | Slug of the link, obtained as specified [here »](/api/links.md#business-chat-links). |

### Result
[Bool](/type/Bool.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | CHATLINK\_SLUG\_EMPTY | The specified slug is empty. |
| 400 | CHATLINK\_SLUG\_EXPIRED | The specified [business chat link](/api/business.md#business-chat-links) has expired. |

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.