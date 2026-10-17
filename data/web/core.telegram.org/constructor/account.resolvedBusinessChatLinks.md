# account.resolvedBusinessChatLinks

Contains info about a single resolved [business chat deep link »](/api/business.md#business-chat-links).

```tl
account.resolvedBusinessChatLinks#9a23af21 flags:# peer:Peer message:string entities:flags.0?Vector<MessageEntity> chats:Vector<Chat> users:Vector<User> = account.ResolvedBusinessChatLinks;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **flags** | [\#](/type/%23) | Flags, see [TL conditional fields](/mtproto/TL-combinators.md#conditional-fields) |
| **peer** | [Peer](/type/Peer.md) | Destination peer |
| **message** | [string](/type/string.md) | Message to pre-fill in the message input field. |
| **entities** | [flags](/mtproto/TL-combinators.md#conditional-fields).0?[Vector](/type/Vector%20t)&lt;[MessageEntity](/type/MessageEntity.md)&gt; | [Message entities for styled text](/api/entities.md) |
| **chats** | [Vector](/type/Vector%20t)&lt;[Chat](/type/Chat.md)&gt; | Mentioned chats |
| **users** | [Vector](/type/Vector%20t)&lt;[User](/type/User.md)&gt; | Mentioned users |

### Type
[account.ResolvedBusinessChatLinks](/type/account.ResolvedBusinessChatLinks.md)

### Related pages

#### [Styled text with message entities](/api/entities.md)
How to create styled text with message entities

#### [Telegram Business](/api/business.md)
Users can turn their Telegram account into a business account, gaining access to business features such as opening hours, location, quick replies, automated messages, custom start pages, chatbot support, and more.