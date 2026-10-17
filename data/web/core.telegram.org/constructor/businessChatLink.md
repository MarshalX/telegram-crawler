# businessChatLink

Contains info about a [business chat deep link »](/api/business.md#business-chat-links) created by the current account.

```tl
businessChatLink#b4ae666f flags:# link:string message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string views:int = BusinessChatLink;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **link** | [string](/type/string.md) | [Business chat deep link](/api/links.md#business-chat-links). |
| **message** | [string](/type/string.md) | Message to pre-fill in the message input field. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Human-readable name of the link, to simplify management in the UI (only visible to the creator of the link). |
| **views** | [int](/type/int.md) | Number of times the link was resolved (clicked/scanned/etc...). |

### Type
[BusinessChatLink](/type/BusinessChatLink.md)

### Related pages

#### [Deep links](/api/links.md)
Telegram clients must handle special tg:// and t.me deep links encountered in messages, link entities and in other apps by registering OS handlers.

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.