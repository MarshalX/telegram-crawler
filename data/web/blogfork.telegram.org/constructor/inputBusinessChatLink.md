# inputBusinessChatLink

Contains info about a [business chat deep link »](/api/business.md#business-chat-links) to be created by the current account.

```tl
inputBusinessChatLink#11679fa7 flags:# message:string entities:flags.0?Vector<MessageEntity> title:flags.1?string = InputBusinessChatLink;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **message** | [string](/type/string.md) | Message to pre-fill in the message input field. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **title** | [flags](/mtproto/TL-combinators.md#conditional-fields).1?[string](/type/string.md) | Human-readable name of the link, to simplify management in the UI (only visible to the creator of the link). |

### Type
[InputBusinessChatLink](/type/InputBusinessChatLink.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.