# businessRecipients

Specifies the chats that **can** receive Telegram Business [away »](/api/business.md#away-messages) and [greeting »](/api/business.md#greeting-messages) messages.

If `exclude_selected` is set, specifies all chats that **cannot** receive Telegram Business [away »](/api/business.md#away-messages) and [greeting »](/api/business.md#greeting-messages) messages.

```tl
businessRecipients#21108ff7 flags:# existing_chats:flags.0?true new_chats:flags.1?true contacts:flags.2?true non_contacts:flags.3?true exclude_selected:flags.5?true users:flags.4?Vector<long> = BusinessRecipients;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **existing\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[true](/constructor/true.md) | All existing private chats. |
| **new\_chats** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[true](/constructor/true.md) | All new private chats. |
| **contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).2?[true](/constructor/true.md) | All private chats with contacts. |
| **non\_contacts** | [flags](/mtproto/TL-combinators.md#conditional-fields).3?[true](/constructor/true.md) | All private chats with non-contacts. |
| **exclude\_selected** | [flags](/mtproto/TL-combinators.md#conditional-fields).5?[true](/constructor/true.md) | If set, inverts the selection. |
| **users** | [flags](/mtproto/TL-combinators.md#conditional-fields).4?[Vector](/type/Vector%20t)&lt;[long](/type/long.md)&gt; | Only private chats with the specified users. |

### Type
[BusinessRecipients](/type/BusinessRecipients.md)

### Related pages

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.