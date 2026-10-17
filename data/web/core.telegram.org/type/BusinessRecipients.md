# BusinessRecipients

Specifies the chats that **can** receive Telegram Business [away »](/api/business.md#away-messages) and [greeting »](/api/business.md#greeting-messages) messages.

```tl
businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [businessRecipients](/constructor/businessRecipients.md) | Specifies the chats that **can** receive Telegram Business [away »](/api/business.md#away-messages) and [greeting »](/api/business.md#greeting-messages) messages.\
\
If `exclude_selected` is set, specifies all chats that **cannot** receive Telegram Business [away »](/api/business.md#away-messages) and [greeting »](/api/business.md#greeting-messages) messages. |

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.